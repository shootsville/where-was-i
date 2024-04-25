import html2canvas from "html2canvas";

const generateScreenshot = function() {
  const screenshotTarget = document.body;
  
  return html2canvas(screenshotTarget, { scale: 0.5, logging: true }).then((canvas: HTMLCanvasElement) => {
    const base64image = canvas.toDataURL("image/png");
    return base64image;
  });
}

const createHistory = async function(newItem: string, history: Array<LocationObject>, options: WhereWasIOptions) {
  const imageData = await generateScreenshot();
  const sortedHistory = [
    ...new Map([
      { location: newItem, imageData, title: document.title, newObject: true }, 
      ...history.map(h => ({...h, newObject: false}))
    ].map(item => [item["location"], item])).values()];

  return sortedHistory;
}


export default createHistory;