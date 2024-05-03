export declare type WhereWasIOptions = {
  /** The title to display in the control panel, @default "Where was i?" */
  panelTitle?: string
  /** the maximum amount of location objects to display */
  maxAmount?: number
  /** the style for the location objects, @default "panel" */
  style?: 'cards' | 'panel' | 'drawer'
  /** how often the screenshot should refresh */
  screenRefreshRate?: number
  /** adds filter to which paths should be added as location objects */
  acceptedPaths?:
    | {
        /** path should contain the following string */
        type: 'contains'
        path: string
      }
    | {
        /** path should start with the following string */
        type: 'startsWith'
        path: string
      }
}

export declare type LocationObject = {
  title: string
  location: string
  imageData: string
  newObject: boolean
}
