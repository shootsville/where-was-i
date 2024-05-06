import { LocationObject } from '..'
import { infoMiniIcon, trashMiniIcon } from './icons'
import { createWwiElement } from '../helpers/elementFactory'
import { getScreenThumbnail } from './screenThumbnail'
import { clearStorage } from '../helpers/storage'

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

const getPanelsView = function (history: Array<LocationObject>) {
  const panelView = createWwiElement<HTMLDivElement>('wwi-panel', 'div')
  const controlPanel = createWwiElement('wwi-panel-controls', 'div')
  const controlPanelTitle = createWwiElement(
    'wwi-panel-screens-title',
    'h3',
    window.wwiOptions.panelTitle ?? 'Where was I?',
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
  const screensContainer = createWwiElement(
    'wwi-panel-screens-container',
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
  clearButton.addEventListener('click', clearStorage)

  infoButton.setAttribute(
    'tooltip',
    `This is your recently visited pages on this site. 
This is only stored on your computer and is removed as soon as you close the browser`,
  )

  buttonsContainer.append(infoButton)
  buttonsContainer.append(clearButton)

  controlPanel.append(controlPanelTitle)
  controlPanel.append(buttonsContainer)

  panelView.append(screensContainer)
  panelView.append(controlPanel)

  return panelView
}

export default getPanelsView
