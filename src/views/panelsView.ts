import { LocationObject, WhereWasIOptions } from '..'
import { infoMiniIcon, trashMiniIcon } from './icons'
import { createWwiElement } from '../helpers/elementFactory'
import { getScreenThumbnail } from './screenThumbnail'
import getFooterView from './footerView'
import { IHistoryView } from '../helpers/renderHistory'

class PanelsView implements IHistoryView {
  #options: WhereWasIOptions
  #screensContainer: HTMLDivElement

  view: HTMLDivElement

  constructor(options: WhereWasIOptions) {
    this.#options = options

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
    this.#screensContainer = createWwiElement('wwi-screens-container', 'div')
    const buttonsContainer = createWwiElement(
      'wwi-panel-buttons-container',
      'div',
      undefined,
      ['buttons-container'],
    )

    clearButton.setAttribute('tooltip', 'Clear your history')
    clearButton.addEventListener('click', () => {
      document.dispatchEvent(new Event('wwi-hide-view'))
      window.wwiStorage.clear()
    })

    infoButton.setAttribute(
      'tooltip',
      `This is your recently visited pages on this site. 
This is only stored on your computer${options.storage === 'session'
        ? ' and will be cleared when you close your browser'
        : '. Clear the history by clicking the trash bin'
      }`,
    )

    controlPanelTitle.append(infoButton)
    closeButton.addEventListener('click', () => {
      document.dispatchEvent(new Event('wwi-hide-view'))
    })
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
          document.dispatchEvent(new Event('wwi-hide-view'))
        }, 700)
      })
    }

    panelView.append(controlPanel)
    panelView.append(this.#screensContainer)
    const footerContainer = getFooterView(options)
    if (footerContainer) {
      panelView.append(footerContainer)
    }

    this.view = panelView
  }

  render(locations: Array<LocationObject>) {
    this.#screensContainer.querySelectorAll('.wwi-screen-container').forEach(elm => elm.remove())
    this.#screensContainer.querySelector('.wwi-no-session-elm')?.remove()
    if (!locations.length) {
      const emptyLabel = createWwiElement('wwi-no-session-elm', 'em')
      emptyLabel.innerText = 'No session history'
      this.#screensContainer.append(emptyLabel)
      return
    }

    locations
      .map((obj, i) => getScreenThumbnail(obj, i, this.#options))
      .forEach(screen => this.#screensContainer.append(screen))
  }
}

export default PanelsView
