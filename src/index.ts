import renderHistory from './helpers/renderHistory'
import createHistory, { generateScreenshot } from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import 'url-change-event'
import { getStorage, setStorage } from './helpers/storage'

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
}

declare type LocationObject = {
  title: string
  location: string
  imageData: string
  newObject: boolean
  metafields?: string[]
}

window.wwiOptions = { maxAmount: 12, style: 'cards' }

let INTERVAL = 0

const updateCurrentScreen = function (path: string) {
  INTERVAL = window.setInterval(() => {
    generateScreenshot().then(res => {
      const storage = getStorage()
      const newLocation = `${location.origin}${path}`
      const currentLocationObject = storage.find(
        s => s.location === newLocation,
      )
      const currentLocationElement = document.querySelector<HTMLDivElement>(
        `#wwi-container [data-location="${newLocation}"]`,
      )
      if (currentLocationObject && currentLocationElement) {
        currentLocationObject.imageData = res
        currentLocationElement.style.background = `url(${res})`
      }

      setStorage(storage)
    })
  }, window.wwiOptions.screenRefreshRate ?? 5000)
}

const WhereWasI = function (instanceOptions?: WhereWasIOptions) {
  let storage = getStorage()

  if (instanceOptions) {
    window.wwiOptions = instanceOptions
  }

  let initiated = false
  const initiate = () => {
    initiated = true
    createHistory(location.pathname, storage).then(res => {
      storage = res
      setStorage(storage)
      renderHistory(storage)
    })

    updateCurrentScreen(location.pathname)
    applyCss()
  }

  window.addEventListener('urlchangeevent', () => {
    clearInterval(INTERVAL)
    /** SPA:s trigger url change event before changing rendered page */
    setTimeout(() => {
      createHistory(location.pathname, storage).then(res => {
        storage = res
        setStorage(storage)
        renderHistory(storage)
      })
      updateCurrentScreen(location.pathname)
    }, 500)
  })

  document.addEventListener('DOMContentLoaded', initiate)

  return {
    initiate,
    initiated,
  }
}

export type { LocationObject, WhereWasIOptions }
export default WhereWasI
