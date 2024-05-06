import { LocationObject } from '..'
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

export const clearStorage = function () {
  toggleVisibility(false)
  setTimeout(() => {
    window.sessionStorage.removeItem('wwi-items')
    setShowButtonValue(0)
    renderHistory([])
  }, ANIMATION_TIMEOUT)
}
