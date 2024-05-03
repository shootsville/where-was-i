import { toggleVisibility } from '..'
import { LocationObject, WhereWasIOptions } from '../types'
import { infoMiniIcon, trashMiniIcon } from '../helpers/icons'
import { createWwiElement } from '../helpers/elementFactory'

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

  history.forEach((obj, index) => {
    const screenContainer = document.createElement('div')
    screenContainer.classList.add('screen')

    const screen = document.createElement('a')
    const tooltip = document.createElement('span')

    screen.title = obj.title
    screen.classList.add('where-was-i-screen')

    if (obj.newObject) {
      screen.classList.add('where-was-i-screen--new')
    }
    screen.href = obj.location
    screen.dataset.index = index.toString()
    screen.dataset.location = obj.location

    screen.style.setProperty('--card-index', index.toString())
    screen.style.background = `url(${obj.imageData})`
    screen.style.backgroundSize = 'cover'
    screen.style.backgroundPosition = 'center center'

    screen.addEventListener('click', function (e) {
      e.preventDefault()
      toggleVisibility(false)

      const currentTarget = e.currentTarget as HTMLAnchorElement
      setTimeout(() => {
        window.location.href = currentTarget.href
      }, 400)
    })

    tooltip.classList.add('where-was-i-tooltip')
    tooltip.innerHTML = obj.title
    screenContainer.append(screen)
    screenContainer.append(tooltip)
    screensContainer.append(screenContainer)
  })
}

const getDrawerView = function (
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  const drawerView = createWwiElement<HTMLDivElement>(
    'where-was-i-drawer',
    'div',
  )
  const controlPanel = createWwiElement(
    '#where-was-i-panel-controls',
    'div',
    undefined,
    ['control-buttons'],
  )
  const controlPanelTitle = createWwiElement(
    'where-was-i-panel-screens-title',
    'label',
    options.panelTitle ?? 'Where was I?',
  )
  const clearButton = createWwiElement(
    'where-was-i-panel-screens-clear-button',
    'button',
    trashMiniIcon,
    ['where-was-i-clear-button'],
  )
  const infoButton = createWwiElement(
    'where-was-i-panel-screens-info-button',
    'button',
    infoMiniIcon,
    ['where-was-i-clear-button'],
  )
  const screensContainer = createWwiElement(
    'where-was-i-panel-screens-container',
    'div',
    undefined,
    ['drawer'],
  )
  const buttonsContainer = createWwiElement(
    'where-was-i-panel-buttons-container',
    'div',
  )

  buttonsContainer.append(infoButton)
  buttonsContainer.append(clearButton)
  controlPanel.append(controlPanelTitle)
  controlPanel.append(buttonsContainer)

  screensContainer.innerHTML = ''
  screensContainer.append(controlPanel)
  renderPanelScreens(history, screensContainer)

  clearButton.title = 'Clear your session history'
  infoButton.title = 'What is this?'

  clearButton.addEventListener('click', function () {
    toggleVisibility(false)
  })

  drawerView.append(screensContainer)
  return drawerView
}

export default getDrawerView
