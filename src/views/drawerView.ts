import { LocationObject, WhereWasIOptions } from '..'
import { infoMiniIcon, trashMiniIcon } from './icons'
import { createWwiElement } from '../helpers/elementFactory'
import { getScreenThumbnail } from './screenThumbnail'
import { toggleVisibility } from './showButton'
import getFooterView from './footerView'

const renderPanelScreens = function (
  history: LocationObject[],
  screensContainer: Element,
) {
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

const getDrawerView = function (
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  const drawerView = createWwiElement<HTMLDivElement>('wwi-drawer', 'div')
  const controlPanel = createWwiElement(
    '#wwi-panel-controls',
    'div',
    undefined,
    ['control-buttons'],
  )
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
    ['wwi-button'],
  )
  const screensContainer = createWwiElement(
    'wwi-screens-container',
    'div',
    undefined,
  )
  const buttonsContainer = createWwiElement(
    'wwi-panel-buttons-container',
    'div',
    undefined,
    ['buttons-container'],
  )

  const footerContainer = getFooterView(options)

  infoButton.setAttribute(
    'tooltip',
    `This is your recently visited pages on this site. 
This is only stored on your computer and is removed as soon as you close the browser`,
  )
  infoButton.setAttribute('tooltip-direction', 'bottom')

  clearButton.setAttribute('tooltip', 'Clear your session history')
  clearButton.setAttribute('tooltip-direction', 'bottom')

  clearButton.addEventListener('click', () =>
    window.wwiStorage.clearStorage(options),
  )
  closeButton.addEventListener('click', () => toggleVisibility(false))

  controlPanelTitle.append(infoButton)

  buttonsContainer.append(clearButton)
  buttonsContainer.append(closeButton)

  controlPanel.append(controlPanelTitle)
  controlPanel.append(buttonsContainer)

  renderPanelScreens(history, screensContainer)
  if (options.autoClosing !== false) {
    let closeTimeout = 0
    let mouseWithin = true
    drawerView.addEventListener('mouseenter', function () {
      mouseWithin = true
      if (closeTimeout) {
        window.clearTimeout(closeTimeout)
      }
    })

    drawerView.addEventListener('mouseleave', function () {
      mouseWithin = false
      closeTimeout = window.setTimeout(() => {
        if (mouseWithin) {
          return
        }
        toggleVisibility(false)
      }, 1500)
    })
  }

  drawerView.append(controlPanel)
  drawerView.append(screensContainer)
  if (footerContainer) {
    drawerView.append(footerContainer)
  }

  return drawerView
}

export default getDrawerView
