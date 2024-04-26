import html2canvas from "html2canvas";
import { LocationObject, WhereWasIOptions } from "../types";

const generateScreenshot = function() {
  const screenshotTarget = document.body;
  
  return html2canvas(screenshotTarget, { scale: 0.5, logging: true,  }).then((canvas: HTMLCanvasElement) => {
    const base64image = canvas.toDataURL("image/png");
    return base64image;
  });
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

  const imageData = await generateScreenshot();
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