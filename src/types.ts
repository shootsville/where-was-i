
export declare type WhereWasIOptions = {
  /** the maximum amount of location objects to display */
  maxAmount?: number;
  /** the style for the location objects, @default "cards" */
  style?: "cards" | "panel";
  /** adds filter to which paths should be added as location objects */
  acceptedPaths?: 
    { 
      /** path should contain the following string */
      type: "contains",
      path: string 
    } 
    | 
    {
      /** path should start with the following string */
      type: "startsWith", 
      path: string 
    };
};

export declare type LocationObject = {
  title: string;
  location: string;
  imageData: string;
  newObject: boolean;
};