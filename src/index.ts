import renderHistory from './helpers/renderHistory'
import createHistory, { generateScreenshot } from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import 'url-change-event'
import { Options as CanvasOptions } from 'html2canvas'
import { logOptions } from './helpers/logger'
import { historyIcon } from './views/icons'
import { wwiSessionStorage } from './data/sessionStorage'
import { wwiLocalStorage } from './data/localStorage'

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
  /** how often the screenshot should refresh in milliseconds. @default 15000 */
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
  showButtonOptions?: ShowButtonOptions;
  /** styling options for the footer.  */
  footerOptions?: FooterOptions;
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
  screenRefreshRate: 15000,
  autoClosing: true,
  showButtonOptions: {
    position: 'bottom-right',
    html: historyIcon,
  },
}

let INTERVAL = 0

const updateCurrentScreen = function (path: string, options: WhereWasIOptions) {
  logOptions('updateCurrentScreen', options)
  INTERVAL = window.setInterval(() => {
    generateScreenshot(options).then(res => {
      const storage = window.wwiStorage.getStorage()
      const newLocation = `${location.origin}${path}`
      const currentLocationObject = storage.find(
        s => s.location === newLocation,
      )
      const currentLocationElement = document.querySelector<HTMLImageElement>(
        `#wwi-container [data-location="${newLocation}"]`,
      )
      if (currentLocationObject && currentLocationElement) {
        currentLocationObject.imageData = res
        currentLocationElement.src = res
      }

      window.wwiStorage.setStorage(storage)
    })
  }, options.screenRefreshRate ?? 15000)
}


const WhereWasI = function (options?: WhereWasIOptions) {
  options = options ?? DEFAULT_OPTIONS
  window.wwiStorage = options.storage === "local" ? wwiLocalStorage : wwiSessionStorage

  const storage = window.wwiStorage.getStorage()

  logOptions('WhereWasI', options)

  let initiated = false
  const initiate = (initOptions?: WhereWasIOptions) => {
    logOptions('initiate', options)
    initOptions = initOptions ?? DEFAULT_OPTIONS
    initiated = true
    createHistory(location.pathname, storage, initOptions).then(res => {
      window.wwiStorage.setStorage(res)
      renderHistory(res, initOptions)
    })

    updateCurrentScreen(location.pathname, initOptions)
    applyCss(initOptions)
  }

  window.addEventListener('urlchangeevent', () => {
    logOptions('urlchangevent', options)
    window.clearInterval(INTERVAL)
    /** SPA:s trigger url change event before changing rendered page */
    window.setTimeout(() => {
      createHistory(location.pathname, storage, options).then(res => {
        window.wwiStorage.setStorage(res)
        renderHistory(res, options)
        renderHistory(storage, options)
      })
      updateCurrentScreen(location.pathname, options)
    }, 500)
  })

  document.addEventListener('DOMContentLoaded', () => initiate(options))

  return {
    initiate,
    initiated,
  }
}

export type { LocationObject, WhereWasIOptions }
export default WhereWasI
