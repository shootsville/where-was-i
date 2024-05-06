import { LocationObject } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { historyIcon } from './icons'

export const ANIMATION_TIMEOUT = 400

export const toggleVisibility = function (show?: boolean) {
  const wwiContainer = document.querySelector('#wwi-container')
  const toggleButton = document.querySelector(
    '#wwi-container #wwi-show-button',
  )

  if (!wwiContainer) {
    console.error('container was not found')
    return
  }

  if (typeof show !== 'undefined') {
    if (show) {
      wwiContainer.classList.add('open')
      toggleButton?.classList.add('open')
    } else {
      wwiContainer.classList.remove('open')
      toggleButton?.classList.remove('open')
    }
    return
  }

  wwiContainer.classList.toggle('open')
  toggleButton?.classList.toggle('open')
}

const addShowButton = function (
  container: HTMLDivElement,
  history: LocationObject[],
) {
  const showButton = createWwiElement(
    'wwi-show-button',
    'button',
    historyIcon,
  )

  showButton.setAttribute('data-count', history.length.toString())

  showButton.addEventListener('click', () => toggleVisibility())

  container.append(showButton)
}

const setShowButtonValue = function (amount: number) {
  const showButton = document.querySelector('#wwi-show-button')

  if (showButton) {
    showButton.setAttribute('data-count', amount.toString())
  }
}

export { addShowButton, setShowButtonValue }
