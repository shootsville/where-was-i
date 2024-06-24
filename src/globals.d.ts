declare type IStorage = {
  get: () => Promise<Array<LocationObject>>
  push: (location: LocationObject) => Promise<void>
  set: (locations: LocationObject[]) => Promise<void>
  remove: (obj: LocationObject) => Promise<void>
  clear: () => void
}

interface Window {
  wwiStorage: IStorage
}

window.wwiStorage = window.wwiStorage || {}
