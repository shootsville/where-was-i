import { LocationObject, WhereWasIOptions } from '..'

export interface IStorage {
  getStorage: () => Array<LocationObject>
  setStorage: (locations: LocationObject[]) => void
  removeFromStorage: (obj: LocationObject) => void
  clearStorage: (options: WhereWasIOptions) => void
}
