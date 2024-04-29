import { setStorage } from "..";
import { LocationObject, WhereWasIOptions } from "../types";
import { historyIcon, infoMiniIcon, trashMiniIcon } from "./icons";

const renderPanelScreens = function(history: LocationObject[], container: HTMLDivElement, showButton: Element, screensContainer: Element) {
  screensContainer.innerHTML = "";
  if (!history.length) {
    const emptyLabel = document.createElement("em");
    emptyLabel.innerText = "No session history";
    screensContainer.append(emptyLabel);
    return;
  }
  history.forEach((obj, index) => {
    const screenContainer = document.createElement("div");

    const screen = document.createElement("a");
    const tooltip = document.createElement("span")

    screen.title = obj.title;
    screen.classList.add("where-was-i-screen");
    if (obj.newObject) {
      screen.classList.add("where-was-i-screen--new");
    }
    screen.href = obj.location;
    screen.dataset.index = index.toString();
    screen.dataset.location = obj.location;

    screen.style.setProperty("--card-index", index.toString())
    screen.style.background = `url(${obj.imageData})`;
    screen.style.backgroundSize = "cover";
    screen.style.backgroundPosition = "center center";

    screen.addEventListener("click", function(e) {
      e.preventDefault(); 
      const currentTarget = e.currentTarget as HTMLAnchorElement;
      container.classList.remove("open");
      showButton.classList.remove("open");
      setTimeout(() => { window.location.href = currentTarget.href; }, 400);
    });

    tooltip.classList.add("where-was-i-tooltip");
    tooltip.innerHTML = obj.title;
    screenContainer.append(screen);
    screenContainer.append(tooltip)
    screensContainer.append(screenContainer);
  });
}

const renderPanel = function(container: HTMLDivElement, history: Array<LocationObject>, options: WhereWasIOptions) {
  const body = document.body;
  const controlPanel = document.querySelector("#where-was-i-panel-controls") || document.createElement("div");
  const controlPanelTitle = document.createElement("label");
  const clearButton = document.createElement("button");
  const infoButton = document.createElement("button");
  const screensContainer = document.querySelector("#where-was-i-panel-screens-container") || document.createElement("div");
  const showButton = document.querySelector("#where-was-i-panel-show-button") || document.createElement("button");

  screensContainer.id = "where-was-i-panel-screens-container";
  controlPanel.id = "where-was-i-panel-controls";
  controlPanelTitle.innerText = options.panelTitle ?? "Where was I?";
  showButton.id = "where-was-i-panel-show-button";
  showButton.innerHTML = historyIcon;

  showButton.setAttribute("data-count", history.length.toString());
  
  showButton.addEventListener("click", function(e) {
    container.classList.toggle("open");
    
    if (e.currentTarget) {
      (e.currentTarget as HTMLButtonElement).classList.toggle("open");
    }
  });

  renderPanelScreens(history, container, showButton, screensContainer);

  clearButton.classList.add("where-was-i-clear-button");
  clearButton.title = "Clear your session history";
  clearButton.innerHTML = trashMiniIcon;

  infoButton.classList.add("where-was-i-clear-button");
  infoButton.title = "What is this?";
  infoButton.innerHTML = infoMiniIcon;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.append(infoButton);
  buttonsContainer.append(clearButton);

  clearButton.addEventListener("click", function() {
    container.classList.toggle("open");
    showButton.classList.toggle("open");

    setTimeout(() => {
      setStorage([]);
      showButton.removeAttribute("data-count");
      renderPanelScreens([], container, showButton, screensContainer);
    }, 400);
  });

  controlPanel.append(controlPanelTitle);
  controlPanel.append(buttonsContainer);
  
  container.append(showButton);
  container.append(screensContainer);
  container.append(controlPanel);

  body.append(container);
}

export default renderPanel;