declare type IStorage = {
  getStorage: () => Promise<Array<LocationObject>>
  setStorage: (locations: LocationObject[]) => Promise<void>
  removeFromStorage: (obj: LocationObject) => Promise<void>
  clearStorage: (options: WhereWasIOptions) => void
}

interface Window {
  wwiStorage: IStorage
}

window.wwiStorage = window.wwiStorage || {}
