import { LocationObject } from '..'

export function onlyUnique(
  value: LocationObject,
  index: number,
  array: LocationObject[],
) {
  return (
    array.indexOf(array.find(l => l.location === value.location)!) === index
  )
}

export const throwStorageEvent = function (locations: LocationObject[]) {
  const event = new CustomEvent('wwi-storage', {
    detail: {
      locations,
    },
  })
  document.dispatchEvent(event)
}

export interface IStorage {
  get: () => Promise<Array<LocationObject>>
  set: (locations: LocationObject[]) => Promise<void>
  remove: (obj: LocationObject) => Promise<void>
  clear: () => void
  push: (location: LocationObject) => Promise<void>
}
