import { LocationObject, WhereWasIOptions } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { historyIcon } from './icons'

export const ANIMATION_TIMEOUT = 400

export const toggleVisibility = function (show?: boolean) {
  const wwiContainer = document.querySelector('#wwi-container')
  const toggleButton = document.querySelector('#wwi-container #wwi-show-button')

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
  options: WhereWasIOptions,
) {
  const showButton = createWwiElement(
    'wwi-show-button',
    'button',
    options.showButtonOptions?.html ?? historyIcon,
    [
      `wwi-show-button--position-${options.showButtonOptions?.position ?? 'bottom-right'
      }`,
    ],
  )

  if (history.length) {
    showButton.classList.add('wwi-show-button--show')
  }

  showButton.setAttribute('data-count', history.length.toString())
  showButton.addEventListener('click', () => toggleVisibility())
  container.append(showButton)
  window.setTimeout(() => {
    showButton.classList.add('wwi-show-button--settled')
  }, 3000)
}

const setShowButtonValue = function (amount: number) {
  const showButton = document.querySelector('#wwi-show-button')

  if (showButton) {
    showButton.setAttribute('data-count', amount.toString())
    if (!amount) {
      showButton.classList.remove('wwi-show-button--show')
    }
  }
}

export { addShowButton, setShowButtonValue }
