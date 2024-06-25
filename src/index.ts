import HistoryPanel from './helpers/renderHistory'
import {
  createLocationObject,
  generateScreenshot,
  shouldStoreNewItem,
} from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import 'url-change-event'
import { Options as CanvasOptions } from 'html2canvas'
import { logFunc, logOptions } from './helpers/logger'
import { historyIcon } from './views/icons'
import { wwiSessionStorage } from './data/sessionStorage'
import { wwiLocalStorage } from './data/localStorage'
import ShowButton, { ANIMATION_TIMEOUT } from './views/showButton'
import { createWwiElement } from './helpers/elementFactory'
import { throwStorageEvent } from './data/storage'
import attachLocationChangeEvent from './helpers/locationChange'

type ShowButtonPostionType =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'

declare type ShowButtonOptions = {
  position?: ShowButtonPostionType
  html?: string
  color?: string
}

declare type FooterOptions = {
  hide?: boolean
  customHtml?: string
}

declare type WhereWasIOptions = {
  /** The title to display in the control panel, @default "Where was i?" */
  panelTitle?: string
  /** the maximum amount of location objects to display */
  maxAmount?: number
  /** the style for the location objects, @default "panel" */
  style?: 'cards' | 'panel' | 'drawer'
  /** how often the screenshot should refresh in milliseconds. @default 5000 */
  screenRefreshRate?: number
  /** adds filter to which paths should be added as location objects */
  acceptedPaths?:
    | {
        /** path should contain the following string */
        type: 'contains'
        path: string
      }
    | {
        /** path should start with the following string */
        type: 'startsWith'
        path: string
      }
  /** get the content of meta fields to use as metadata along each screenshot */
  metafields?: Array<string | Array<string>>
  /** html2canvas options, see https://html2canvas.hertzen.com/configuration for all options */
  canvasOptions?: CanvasOptions
  /** set log level */
  logging?: 'debug' | 'default'
  /** z-index of the container. @default 1000 */
  zIndex?: string
  /** storage type, @default "session" */
  storage?: 'session' | 'local'
  /** auto close the drawer/panel when leaving. @default true */
  autoClosing?: boolean
  /** styling options for the show button.  */
  showButtonOptions?: ShowButtonOptions
  /** styling options for the footer.  */
  footerOptions?: FooterOptions

  /** callback to be called when a location is navigated to.  */
  navigationCallback?: (location: string) => void
}

declare type LocationObject = {
  title: string
  location: string
  imageData: string
  newObject: boolean
  metafields?: string[]
}

const DEFAULT_OPTIONS: WhereWasIOptions = {
  maxAmount: 12,
  style: 'drawer',
  zIndex: '1000',
  screenRefreshRate: 5000,
  autoClosing: true,
  showButtonOptions: {
    position: 'bottom-right',
    html: historyIcon,
  },
}

class WhereWasI {
  #options: WhereWasIOptions
  #interval: number
  #historyPanel: HistoryPanel
  #showButton: ShowButton
  #container: HTMLDivElement

  constructor(options?: WhereWasIOptions) {
    this.#options = { ...DEFAULT_OPTIONS, ...options }
    this.#interval = 0
    attachLocationChangeEvent(window, history)

    window.wwiStorage =
      this.#options.storage === 'local' ? wwiLocalStorage : wwiSessionStorage
    window.addEventListener('locationchange', () => {
      this.#showButton?.toggleVisibility(false)
      setTimeout(() => {
        logOptions('locationchange', this.#options)

        if (shouldStoreNewItem(location.pathname, this.#options)) {
          createLocationObject(
            `${location.origin}${location.pathname}`,
            this.#options,
          ).then(locationObject => {
            window.wwiStorage.push(locationObject)
          })
        }

        this.#updateCurrentScreen()
      }, ANIMATION_TIMEOUT)
    })

    /** :: MAIN RENDERING EVENT :: */
    document.addEventListener('wwi-storage', event => {
      const locations = (event as CustomEvent).detail.locations
      this.#container.style.setProperty(
        '--children-count',
        locations.length.toString(),
      )
      this.#showButton?.setShowButtonValue(locations.length)

      if (!locations.length) {
        this.#showButton?.toggleVisibility(false)
        setTimeout(() => {
          this.#historyPanel.render(locations)
        }, ANIMATION_TIMEOUT)
      } else {
        this.#historyPanel.render(locations)
      }
    })

    document.addEventListener('wwi-hide-view', () => {
      this.#showButton?.toggleVisibility(false)
    })

    this.#container = createWwiElement<HTMLDivElement>(
      'wwi-container',
      'div',
      '',
    )
    this.#historyPanel = new HistoryPanel(this.#options)
    this.#showButton = new ShowButton(this.#container, this.#options)

    logOptions('WhereWasI', this.#options)
  }

  async initiate() {
    logOptions('initiate', this.#options)

    logFunc('initiate', this.#options, `Iniated where was i`)

    this.#container.setAttribute('data-html2canvas-ignore', 'true')
    this.#container.id = 'wwi-container'
    this.#container.style.zIndex = this.#options.zIndex ?? '1000'

    /** start fresh if render history gets called again */
    this.#container.innerHTML = ''

    setTimeout(() => {
      this.#render()
    }, 800)

    this.#updateCurrentScreen()
    applyCss(this.#options)
  }

  #updateCurrentScreen() {
    logOptions('updateCurrentScreen', this.#options)
    if (this.#interval > 0) {
      window.clearInterval(this.#interval)
      this.#interval = 0
    }

    this.#interval = window.setInterval(async () => {
      if (this.#showButton.isOpen) {
        return
      }

      const newScreen = await generateScreenshot(this.#options)
      const storage = await window.wwiStorage.get()
      logFunc(
        'updateCurrentScreen',
        this.#options,
        `got storage: ${storage.map(s => s.location)}`,
      )

      const currentLocationObject = storage.find(
        s => s.location === location.pathname,
      )

      const currentLocationElement = document.querySelector<HTMLImageElement>(
        `#wwi-container [data-location="${location.pathname}"]`,
      )
      if (currentLocationObject && currentLocationElement) {
        currentLocationObject.imageData = newScreen
        currentLocationElement.src = newScreen
      }

      logFunc(
        'updateCurrentScreen',
        this.#options,
        `setting storage: ${storage.map(s => s.location)}`,
      )
      window.wwiStorage.set(storage)
    }, this.#options.screenRefreshRate ?? 5000)
  }

  async #render() {
    if (shouldStoreNewItem(location.pathname, this.#options)) {
      const newLocation = await createLocationObject(
        `${location.origin}${location.pathname}`,
        this.#options,
      )
      window.wwiStorage.push(newLocation)
    } else {
      const storage = await window.wwiStorage.get()
      throwStorageEvent(storage)
    }

    this.#container.append(this.#showButton.showButton)
    this.#container.append(this.#historyPanel.historyView.view)
    document.body.append(this.#container)
  }
}

export type { LocationObject, WhereWasIOptions }
export default WhereWasI
