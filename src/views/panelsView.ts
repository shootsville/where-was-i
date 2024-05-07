import { LocationObject, WhereWasIOptions } from '..'
import { infoMiniIcon, trashMiniIcon } from './icons'
import { createWwiElement } from '../helpers/elementFactory'
import { getScreenThumbnail } from './screenThumbnail'
import { clearStorage } from '../helpers/storage'
import { toggleVisibility } from './showButton'

const renderPanelScreens = function (
  history: LocationObject[],
  screensContainer: Element,
) {
  screensContainer.innerHTML = ''
  if (!history.length) {
    const emptyLabel = document.createElement('em')
    emptyLabel.innerText = 'No session history'
    screensContainer.append(emptyLabel)
    return
  }

  history
    .map(getScreenThumbnail)
    .forEach(screen => screensContainer.append(screen))
}

const getPanelsView = function (
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  const panelView = createWwiElement<HTMLDivElement>('wwi-panel', 'div')
  const controlPanel = createWwiElement('wwi-panel-controls', 'div')
  const controlPanelTitle = createWwiElement(
    'wwi-panel-screens-title',
    'h3',
    options.panelTitle ?? 'Where was I?',
  )
  const clearButton = createWwiElement(
    'wwi-panel-screens-clear-button',
    'button',
    trashMiniIcon,
    ['wwi-button'],
  )
  const infoButton = createWwiElement(
    'wwi-panel-screens-info-button',
    'button',
    infoMiniIcon,
    ['wwi-button', 'wwi-button--light'],
  )
  const closeButton = createWwiElement(
    'wwi-panel-screens-close-button',
    'button',
    '&#x2715;',
    ['wwi-button', 'wwi-button'],
  )
  const screensContainer = createWwiElement(
    'wwi-screens-container',
    'div',
  )
  const buttonsContainer = createWwiElement(
    'wwi-panel-buttons-container',
    'div',
    undefined,
    ['buttons-container'],
  )

  renderPanelScreens(history, screensContainer)

  clearButton.setAttribute('tooltip', 'Clear your session history')
  clearButton.addEventListener('click', () => clearStorage(options))
  closeButton.addEventListener('click', () => toggleVisibility(false))

  infoButton.setAttribute(
    'tooltip',
    `This is your recently visited pages on this site. 
This is only stored on your computer and is removed as soon as you close the browser window`,
  )

  controlPanelTitle.append(infoButton)

  buttonsContainer.append(clearButton)
  buttonsContainer.append(closeButton)

  controlPanel.append(controlPanelTitle)
  controlPanel.append(buttonsContainer)

  if (options.autoClosing !== false) {
    let closeTimeout = 0
    let mouseWithin = true
    panelView.addEventListener('mouseenter', function () {
      mouseWithin = true
      if (closeTimeout) {
        window.clearTimeout(closeTimeout)
      }
    })

    panelView.addEventListener('mouseleave', function () {
      mouseWithin = false
      closeTimeout = window.setTimeout(() => {
        if (mouseWithin) {
          return
        }
        toggleVisibility(false)
      }, 1200)
    })
  }

  panelView.append(screensContainer)
  panelView.append(controlPanel)

  return panelView
}

export default getPanelsView
