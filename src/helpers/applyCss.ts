import { WhereWasIOptions } from "../types";

const cardsCss = `
  #where-was-i-container {
    --where-was-i-rotation: 6deg;
    position: fixed;
    bottom: 3rem;
    right: 6rem;
    height: 200px;
    width: 160px;
    transform-origin: bottom;
    transition: bottom .4s ease, scale .4s ease;
    scale: 0.6;
  }

  #where-was-i-container:hover {
    bottom: 2rem;
    scale: 1;
  }

  .where-was-i-tooltip {
    position: absolute;
    top: -2rem;
    right: 0.4rem;
    left: 0.4rem;
    max-height: 2rem;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    color: white;
    background: black;
    padding: .2rem .7rem;
    transition: opacity .4s ease;
    border-radius: .2rem .2rem 0 0;
  }

  .where-was-i-card {
    display: block;
    position: absolute;
    inset: 0;
    transform-origin: 40% 100%;
    transition: all .4s ease;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.3);
    height: 200px;
    width: 160px;
    rotate: calc(var(--where-was-i-rotation) * var(--card-index));
    filter: brightness(0.8);
  }

  .where-was-i-card--new {
    animation: getInHere .7s forwards cubic-bezier(0,.52,.36,.94);
  }

  .where-was-i-card:hover {
    filter: brightness(1);
    top: -2rem;
  }

  .where-was-i-card:hover .where-was-i-tooltip {
    opacity: 1;
  }
  
  .where-was-i-card--pad-left-a-little {
    margin-left: -1.25rem;
  }

  .where-was-i-card--pad-left {
    margin-left: -2.5rem;
  }
  .where-was-i-card--pad-right {
    margin-left: 2.5rem;
  }

  .where-was-i-clear-button {
    padding: 1rem;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.7);
    opacity: .5;
    color: white;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    translate: -50% 0;
    transition: opacity .4s ease;
  }

  .where-was-i-clear-button:hover {
    opacity: 1;
  }

  .where-was-i-clear-button:before {
    content: "\\2716";
  }

  @keyframes getInHere {
    0% {
      translate: 0 200%;
    }
    100% {
      translate: 0 0;
    }
  }
`

const panelCss = `
  #where-was-i-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    translate: 0 100%;
    transition: translate .4s ease, box-shadow .4s ease;
    box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
    background-color: white;
    color: #242424;
    padding: 1rem;
    box-sizing: border-box;
  }

  #where-was-i-container.open {
    translate: 0 0;
    pointer-events: all;
    box-shadow: 0px -10px 10px 10px rgba(0,0,0,0.15);
  }

  #where-was-i-panel-screens-container {
    position: relative;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    height: 100%;
    scrollbar-color: rgba(100, 108, 255, 0.3) white;
    scrollbar-width: thin;
    padding-bottom: .5rem;
  }

  #where-was-i-panel-screens-container > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }

  #where-was-i-panel-show-button {
    padding: 1rem;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.7);
    opacity: .5;
    color: white;
    position: absolute;
    top: -5rem;
    right: 2rem;
    transition: opacity .4s ease, bottom .4s ease;
    z-index: 2;
  }

  #where-was-i-panel-show-button:hover {
    opacity: 1;
  }

  #where-was-i-panel-show-button:not(.open):before {
    content: "\\2714";
  }

  #where-was-i-panel-show-button.open:before {
    content: "\\2716";
  }

  #where-was-i-panel-controls {
    padding-top: .5rem;
    margin-top: 1rem;
    border-top: 1.5px solid rgba(100, 108, 255, 0.15);
    display: flex;
    justify-content: end;
  }

  .where-was-i-clear-button {
    background-color: transparent;
    color: #242424;
    transition: background-color .4s ease, color .4s ease;
    padding: 0.3rem 0.6rem;
    border: none;
  }
  .where-was-i-clear-button:hover {
    background-color: #646cff;
    color: white;
  }

  .where-was-i-clear-button:before {
    content: "\\2716";
  }

  .where-was-i-screen {
    display: block;
    height: 120px;
    width: 200px;
    transition: scale .4s ease, box-shadow .4s ease;
    box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
  }

  .where-was-i-screen:hover {
    scale: 1.05;
    box-shadow: 0 0 4px 4px rgba(0,0,0,0.15);
  }
`;

const applyCss = function(options: WhereWasIOptions) {
  const styleTag = document.createElement("style");

  switch(options.style) {
    case "panel":
      styleTag.innerHTML = panelCss;
      break;
    default:
      styleTag.innerHTML = cardsCss;
      break;
  }

  document.head.append(styleTag);
}

export default applyCss;