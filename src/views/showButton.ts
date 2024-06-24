import { WhereWasIOptions } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { historyIcon } from './icons'

export const ANIMATION_TIMEOUT = 400

class ShowButton {
  #container: HTMLDivElement
  showButton: HTMLElement
  isOpen: boolean

  constructor(container: HTMLDivElement, options: WhereWasIOptions) {
    this.#container = container
    this.isOpen = false

    this.showButton = createWwiElement(
      'wwi-show-button',
      'button',
      options.showButtonOptions?.html ?? historyIcon,
      [
        'wwi-show-button--show',
        `wwi-show-button--position-${
          options.showButtonOptions?.position ?? 'bottom-right'
        }`,
      ],
    )

    this.showButton.addEventListener('click', () => this.toggleVisibility())
    container.append(this.showButton)
  }

  setShowButtonValue(amount: number) {
    this.showButton.setAttribute('data-count', amount.toString())
    if (!amount) {
      this.showButton.classList.remove('wwi-show-button--show')
    } else {
      this.showButton.classList.add('wwi-show-button--show')
    }
  }

  toggleVisibility(show?: boolean) {
    if (typeof show !== 'undefined') {
      if (show) {
        this.#container.classList.add('open')
        this.showButton.classList.add('open')
        this.isOpen = true
      } else {
        this.#container.classList.remove('open')
        this.showButton.classList.remove('open')
        this.isOpen = false
      }
      return
    }

    this.isOpen = !this.isOpen
    this.#container.classList.toggle('open')
    this.showButton.classList.toggle('open')
  }
}

export default ShowButton
