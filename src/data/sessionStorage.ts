import { LocationObject } from '..'
import { ANIMATION_TIMEOUT } from '../views/showButton'
import { IStorage, onlyUnique, throwStorageEvent } from './storage'

const get = function (): Promise<Array<LocationObject>> {
  return new Promise(resolve =>
    resolve(
      JSON.parse(
        window.sessionStorage.getItem('wwi-items') ?? '[]',
      ) as Array<LocationObject>,
    ),
  )
}

const push = async function (location: LocationObject): Promise<void> {
  const storage = await get()
  const newStorage = [location, ...storage].filter(onlyUnique)
  set(newStorage)
}

const set = async function (locations: LocationObject[]): Promise<void> {
  window.sessionStorage.setItem('wwi-items', JSON.stringify(locations))
  throwStorageEvent(locations)
}

const remove = async function (obj: LocationObject) {
  const storage = await get()
  const newStorage = storage.filter(st => st.location !== obj.location)

  set(newStorage)
}

const clear = function () {
  window.setTimeout(() => {
    window.sessionStorage.removeItem('wwi-items')
    throwStorageEvent([])
  }, ANIMATION_TIMEOUT)
}

export const wwiSessionStorage: IStorage = {
  get,
  push,
  set,
  remove,
  clear,
}
