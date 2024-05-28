import { LocationObject, WhereWasIOptions } from '..'
import {
  ANIMATION_TIMEOUT,
  setShowButtonValue,
  toggleVisibility,
} from '../views/showButton'
import renderHistory from './renderHistory'

export const getStorage = function () {
  return JSON.parse(
    window.sessionStorage.getItem('wwi-items') ?? '[]',
  ) as Array<LocationObject>
}

export const setStorage = function (locations: LocationObject[]) {
  window.sessionStorage.setItem('wwi-items', JSON.stringify(locations))
}

export const removeFromStorage = function (obj: LocationObject) {
  const newStorage = getStorage().filter(st => st.location !== obj.location)
  setStorage(newStorage)
  setShowButtonValue(newStorage.length)
  document
    .querySelector(`.wwi-screen-container[href="${obj.location}"`)
    ?.remove()
}

export const clearStorage = function (options: WhereWasIOptions) {
  toggleVisibility(false)
  setShowButtonValue(0)
  window.setTimeout(() => {
    window.sessionStorage.removeItem('wwi-items')
    renderHistory([], options)
  }, ANIMATION_TIMEOUT)
}
