import renderHistory from './helpers/renderHistory'
import createHistory, { generateScreenshot } from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import 'url-change-event'
import { getStorage, setStorage } from './helpers/storage'
import { Options as CanvasOptions } from 'html2canvas'
import { logOptions } from './helpers/logger'

declare type WhereWasIOptions = {
  /** The title to display in the control panel, @default "Where was i?" */
  panelTitle?: string
  /** the maximum amount of location objects to display */
  maxAmount?: number
  /** the style for the location objects, @default "panel" */
  style?: 'cards' | 'panel' | 'drawer'
  /** how often the screenshot should refresh */
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
  /** auto close the drawer/panel when leaving. @default true */
  autoClosing?: boolean
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
  style: 'cards',
  logging: 'debug',
  zIndex: '1000',
  screenRefreshRate: 10000,
  autoClosing: true
}

let INTERVAL = 0

const updateCurrentScreen = function (path: string, options: WhereWasIOptions) {
  logOptions('updateCurrentScreen', options)
  INTERVAL = window.setInterval(() => {
    generateScreenshot(options).then(res => {
      const storage = getStorage()
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

      setStorage(storage)
    })
  }, options.screenRefreshRate ?? 5000)
}

const WhereWasI = function (options?: WhereWasIOptions) {
  let storage = getStorage()
  options = options ?? DEFAULT_OPTIONS

  logOptions('WhereWasI', options)

  let initiated = false
  const initiate = (initOptions?: WhereWasIOptions) => {
    logOptions('initiate', options)
    initOptions = initOptions ?? DEFAULT_OPTIONS
    initiated = true
    createHistory(location.pathname, storage, initOptions).then(res => {
      storage = res
      setStorage(storage)
      renderHistory(storage, initOptions)
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
        storage = res
        setStorage(storage)
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
