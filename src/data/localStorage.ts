import { LocationObject, WhereWasIOptions } from ".."
import renderHistory from "../helpers/renderHistory"
import { setShowButtonValue, toggleVisibility, ANIMATION_TIMEOUT } from "../views/showButton"
import { IStorage } from "./storage"


const getStorage = function () {
  return JSON.parse(
    window.localStorage.getItem('wwi-items') ?? '[]',
  ) as Array<LocationObject>
}

const setStorage = function (locations: LocationObject[]) {
  window.localStorage.setItem('wwi-items', JSON.stringify(locations))
}

const removeFromStorage = function (obj: LocationObject) {
  const newStorage = getStorage().filter(st => st.location !== obj.location)
  setStorage(newStorage)
  setShowButtonValue(newStorage.length)
  document
    .querySelector(`.wwi-screen-container[href="${obj.location}"`)
    ?.remove()
}

const clearStorage = function (options: WhereWasIOptions) {
  toggleVisibility(false)
  setShowButtonValue(0)
  window.setTimeout(() => {
    window.localStorage.removeItem('wwi-items')
    renderHistory([], options)
  }, ANIMATION_TIMEOUT)
}

export const wwiLocalStorage: IStorage = { getStorage, setStorage, removeFromStorage, clearStorage }