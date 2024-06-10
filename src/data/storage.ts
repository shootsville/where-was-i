import { LocationObject, WhereWasIOptions } from '..'

export interface IStorage {
  getStorage: () => Promise<Array<LocationObject>>
  setStorage: (locations: LocationObject[]) => Promise<void>
  removeFromStorage: (obj: LocationObject) => Promise<void>
  clearStorage: (options: WhereWasIOptions) => void
}
