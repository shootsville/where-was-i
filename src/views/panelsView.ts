import { clearStorage } from '..'
import { LocationObject } from '../types'
import { infoMiniIcon, trashMiniIcon } from '../helpers/icons'
import { createWwiElement } from '../helpers/elementFactory'
import { getScreenThumbnail } from './screenThumbnail'

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

  history.map(getScreenThumbnail).forEach(screen => screensContainer.append(screen));
}

const getPanelsView = function (
  history: Array<LocationObject>
) {
  const panelView = createWwiElement<HTMLDivElement>('where-was-i-panel', 'div')
  const controlPanel = createWwiElement('where-was-i-panel-controls', 'div')
  const controlPanelTitle = createWwiElement(
    'where-was-i-panel-screens-title',
    'h3',
    window.wwiOptions.panelTitle ?? 'Where was I?',
  )
  const clearButton = createWwiElement(
    'where-was-i-panel-screens-clear-button',
    'button',
    trashMiniIcon,
    ['where-was-i-button'],
  )
  const infoButton = createWwiElement(
    'where-was-i-panel-screens-info-button',
    'button',
    infoMiniIcon,
    ['where-was-i-button', 'where-was-i-button--light'],
  )
  const screensContainer = createWwiElement(
    'where-was-i-panel-screens-container',
    'div',
  )
  const buttonsContainer = createWwiElement(
    'where-was-i-panel-buttons-container',
    'div',
    undefined,
    ['buttons-container']
  )

  renderPanelScreens(history, screensContainer)

  clearButton.setAttribute("tooltip", "Clear your session history")
  clearButton.addEventListener('click', clearStorage)

  infoButton.setAttribute("tooltip", `This is your recently visited pages on this site. 
This is only stored on your computer and is removed as soon as you close the browser`)

  buttonsContainer.append(infoButton)
  buttonsContainer.append(clearButton)


  controlPanel.append(controlPanelTitle)
  controlPanel.append(buttonsContainer)

  panelView.append(screensContainer)
  panelView.append(controlPanel)

  return panelView
}

export default getPanelsView
