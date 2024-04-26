import html2canvas from "html2canvas";
import { LocationObject, WhereWasIOptions } from "../types";

const PANEL_CANVAS_OPTIONS = {
  scrollY: 0,
  scale: 0.25,
  windowWidth: 1200,
  windowHeight: 800,
  imageTimeout: 4000
}

const CARD_CANVAS_OPTIONS = {
  scale: 0.25,
  windowHeight: 1200,
  windowWidth: 800,
  scrollY: 0
};

const generateScreenshot = async function(options: WhereWasIOptions) {
  const screenshotTarget = document.body;

  const canvas = await html2canvas(screenshotTarget, options.style === "panel" ? PANEL_CANVAS_OPTIONS : CARD_CANVAS_OPTIONS);
  const base64image = canvas.toDataURL("image/png");

  return base64image;
}

const createHistory = async function(newItem: string, history: Array<LocationObject>, options: WhereWasIOptions) {
  if (options.acceptedPaths) {
    let shouldReturn = false;
    switch (options.acceptedPaths.type) {
      case "contains":
        shouldReturn = !newItem.includes(options.acceptedPaths.path)
        break;
      case "startsWith":
        shouldReturn = !newItem.startsWith(options.acceptedPaths.path);
        break;
    }

    if (shouldReturn) {
      return history;
    }
  }

  const imageData = await generateScreenshot(options);
  const sortedHistory = [
    ...new Map([
      { location: `${location.origin}${newItem}`, imageData, title: document.title, newObject: true }, 
      ...history.map(h => ({...h, newObject: false}))
    ].map(item => [item["location"], item])).values()];

  if (options.maxAmount && sortedHistory.length > options.maxAmount) {
    return sortedHistory.slice(0, options.maxAmount);
  }

  return sortedHistory;
}


export default createHistory;