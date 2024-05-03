import renderHistory from './helpers/renderHistory'
import createHistory, { generateScreenshot } from './helpers/createHistory'
import applyCss from './helpers/applyCss'
import { LocationObject, WhereWasIOptions } from './types'
import 'url-change-event'

export type { LocationObject, WhereWasIOptions }

let INTERVAL = 0

export const getStorage = function () {
  return JSON.parse(
    window.sessionStorage.getItem('wwi-items') ?? '[]',
  ) as Array<LocationObject>
}
export const setStorage = function (locations: LocationObject[]) {
  window.sessionStorage.setItem('wwi-items', JSON.stringify(locations))
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

const updateCurrentScreen = function (options: WhereWasIOptions, path: string) {
  INTERVAL = window.setInterval(() => {
    generateScreenshot(options).then(res => {
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
  }, options.screenRefreshRate ?? 5000)
}

const whereWasI = function (
  options: WhereWasIOptions = { maxAmount: 12, style: 'cards' },
) {
  let storage = getStorage()

  window.addEventListener('urlchangeevent', () => {
    clearInterval(INTERVAL)
    /** SPA:s trigger url change event before changing rendered page */
    setTimeout(() => {
      createHistory(location.pathname, storage, options).then(res => {
        storage = res
        setStorage(storage)
        renderHistory(storage, options)
      })
      updateCurrentScreen(options, location.pathname)
    }, 500)
  })

  document.addEventListener('DOMContentLoaded', () => {
    createHistory(location.pathname, storage, options).then(res => {
      storage = res
      setStorage(storage)
      renderHistory(storage, options)
    })
    updateCurrentScreen(options, location.pathname)

    applyCss(options)
  })
}

export default whereWasI
