import { LocationObject, WhereWasIOptions } from '..'
import renderHistory from '../helpers/renderHistory'
import {
  setShowButtonValue,
  toggleVisibility,
  ANIMATION_TIMEOUT,
} from '../views/showButton'
import { IStorage } from './storage'

const getStorage = function (): Promise<Array<LocationObject>> {
  return new Promise(resolve => resolve(JSON.parse(
    window.sessionStorage.getItem('wwi-items') ?? '[]',
  ) as Array<LocationObject>));
}

const setStorage = function (locations: LocationObject[]): Promise<void> {
  return new Promise(resolve => { window.sessionStorage.setItem('wwi-items', JSON.stringify(locations)); resolve(undefined) })
}

const removeFromStorage = async function (obj: LocationObject) {
  const storage = await getStorage();
  const newStorage = storage.filter(st => st.location !== obj.location)

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
    window.sessionStorage.removeItem('wwi-items')
    renderHistory([], options)
  }, ANIMATION_TIMEOUT)
}

export const wwiSessionStorage: IStorage = {
  getStorage,
  setStorage,
  removeFromStorage,
  clearStorage,
}
