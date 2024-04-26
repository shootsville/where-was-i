
export declare type WhereWasIOptions = {
  /** the maximum amount of location objects to display */
  maxAmount?: number;
  /** the style for the location objects, @default "cards" */
  style?: "cards" | "panel";
  acceptedPaths?: { type: "contains", path: string } | { type: "startsWith", path: string };
};

export declare type LocationObject = {
  title: string;
  location: string;
  imageData: string;
  newObject: boolean;
};