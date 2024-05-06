import { LocationObject, toggleVisibility } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { historyIcon } from '../helpers/icons'

const addShowButton = function (
  container: HTMLDivElement,
  history: LocationObject[],
) {
  const showButton = createWwiElement(
    'where-was-i-show-button',
    'button',
    historyIcon,
  )

  showButton.setAttribute('data-count', history.length.toString())

  
  showButton.addEventListener('click', () => toggleVisibility())

  container.append(showButton)
}

const setShowButtonValue = function (amount: number) {
  const showButton = document.querySelector("#where-was-i-show-button");

  if (showButton) {
    showButton.setAttribute('data-count', amount.toString());
  }
}

export {
  addShowButton,
  setShowButtonValue
}