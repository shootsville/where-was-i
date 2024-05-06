import renderHistory from './helpers/renderHistory'
import createHistory, { generateScreenshot } from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import { LocationObject } from './types'
import 'url-change-event'
import { setShowButtonValue } from './views/showButton'
import { WhereWasIOptions } from './types'

export type { LocationObject, WhereWasIOptions }

window.wwiOptions = { maxAmount: 12, style: 'cards' };

let INTERVAL = 0
export const ANIMATION_TIMEOUT = 400

export const getStorage = function () {
  return JSON.parse(
    window.sessionStorage.getItem('wwi-items') ?? '[]',
  ) as Array<LocationObject>
}
export const setStorage = function (locations: LocationObject[]) {
  window.sessionStorage.setItem('wwi-items', JSON.stringify(locations))
}

export const clearStorage = function () {
  toggleVisibility(false)
  setTimeout(() => {
    window.sessionStorage.removeItem('wwi-items')
    setShowButtonValue(0)
    renderHistory([])
  }, ANIMATION_TIMEOUT)
}

export const toggleVisibility = function (show?: boolean) {
  const wwiContainer = document.querySelector('#where-was-i-container')
  const toggleButton = document.querySelector(
    '#where-was-i-container #where-was-i-show-button',
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

const updateCurrentScreen = function (path: string) {
  INTERVAL = window.setInterval(() => {
    generateScreenshot().then(res => {
      const storage = getStorage()
      const newLocation = `${location.origin}${path}`
      const currentLocationObject = storage.find(
        s => s.location === newLocation,
      )
      const currentLocationElement = document.querySelector<HTMLDivElement>(
        `#where-was-i-container [data-location="${newLocation}"]`,
      )
      if (currentLocationObject && currentLocationElement) {
        currentLocationObject.imageData = res
        currentLocationElement.style.background = `url(${res})`
      }

      setStorage(storage)
    })
  }, window.wwiOptions.screenRefreshRate ?? 5000)
}

const whereWasI = function (
  instanceOptions?: WhereWasIOptions,
) {
  let storage = getStorage()

  if (instanceOptions) {
    window.wwiOptions = instanceOptions;
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

  document.addEventListener('DOMContentLoaded', () => {
    createHistory(location.pathname, storage).then(res => {
      storage = res
      setStorage(storage)
      renderHistory(storage)
    })
    updateCurrentScreen(location.pathname)

    applyCss()
  })
}

export default whereWasI
