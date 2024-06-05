declare type IStorage = {
  getStorage: () => Array<LocationObject>
  setStorage: (locations: LocationObject[]) => void
  removeFromStorage: (obj: LocationObject) => void
  clearStorage: (options: WhereWasIOptions) => void
}

interface Window {
  wwiStorage: IStorage
}

window.wwiStorage = window.wwiStorage || {}
