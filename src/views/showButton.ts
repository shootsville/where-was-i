import { LocationObject, toggleVisibility } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { historyIcon } from '../helpers/icons'

export function addShowButton(
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
