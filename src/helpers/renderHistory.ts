import { setStorage } from "..";
import { LocationObject, WhereWasIOptions } from "../types";
import renderPanel from "./renderPanel";

const renderAsCards = function(container: HTMLDivElement, history: Array<LocationObject>, options: WhereWasIOptions) {
  const body = document.body;
  const ROTATION = 6;
  const clearButton = document.createElement("button");

  let currentRotation = (ROTATION * history.length / 2) - ROTATION * history.length ;

  history.reverse().forEach((obj, index) => {
    const card = document.createElement("a");
    const tooltip = document.createElement("span")

    card.title = obj.title;
    card.classList.add("where-was-i-card");
    if (obj.newObject) {
      card.classList.add("where-was-i-card--new");
    }
    card.href = obj.location;
    card.dataset.index = index.toString();
    card.dataset.location = obj.location;

    card.style.setProperty("--card-index", index.toString())
    card.style.backgroundColor = `white`;
    card.style.background = `url(${obj.imageData})`;
    card.style.backgroundSize = "contain";
    card.style.backgroundPosition = "center center";
    card.style.backgroundRepeat = "no-repeat";
    card.style.rotate = `${currentRotation}deg`;
    currentRotation += ROTATION;

    card.addEventListener("mouseover", function(e) {
      const div = e.currentTarget as HTMLDivElement;
      const hoveredIndex = Number(div.dataset.index);
      div.classList.add("where-was-i-card--pad-left-a-little");
      document.querySelectorAll<HTMLDivElement>(`.where-was-i-card:not([data-index='${hoveredIndex}'])`).forEach(elm => {
        if (Number(elm.dataset.index) < hoveredIndex) {
          elm.classList.add("where-was-i-card--pad-left");
        } else {
          elm.classList.add("where-was-i-card--pad-right");
        }
      });
    });

    card.addEventListener("mouseout", function(e) {
      document.querySelectorAll(`.where-was-i-card`).forEach(elm => {
          elm.classList.remove("where-was-i-card--pad-left-a-little");
          elm.classList.remove("where-was-i-card--pad-left");
          elm.classList.remove("where-was-i-card--pad-right");
      });
    });

    tooltip.classList.add("where-was-i-tooltip");
    tooltip.innerHTML = obj.title;
    card.append(tooltip);

    container.append(card);
  });

  clearButton.classList.add("where-was-i-clear-button");

  clearButton.addEventListener("click", function() {
    setStorage([]);
    renderHistory([], options);
  });
  container.append(clearButton);

  body.append(container);
}

const renderHistory = function(history: Array<LocationObject>, options: WhereWasIOptions) {
  const container = document.getElementById("where-was-i-container") as HTMLDivElement || document.createElement("div") as HTMLDivElement;

  container.innerHTML = "";
  container.setAttribute("data-html2canvas-ignore", "true");
  container.id = "where-was-i-container";
  container.style.setProperty("--children-count", history.length.toString());

  switch (options.style) {
    case "panel": 
      renderPanel(container, history, options);
      break;
    default: 
      renderAsCards(container, history, options);
      break;
  }
}

export default renderHistory;