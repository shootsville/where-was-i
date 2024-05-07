import { type WhereWasIOptions } from '..'
import { logOptions } from './logger'

const resetCss = `
#wwi-container {
  --main-color: 100, 108, 255;
  --dark-color: 36, 36, 36;

  box-sizing: border-box;
  font-size: 16px;
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

#wwi-container *, *:before, #wwi-container *:after {
  box-sizing: inherit;
}

#wwi-container h1, 
#wwi-container h2, 
#wwi-container h3,
#wwi-container h4, 
#wwi-container h5, 
#wwi-container h6, 
#wwi-container p, 
#wwi-container ol, 
#wwi-container ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

#wwi-container ol, 
#wwi-container ul {
  list-style: none;
}

#wwi-container img {
  max-width: 100%;
  height: auto;
}

#wwi-container button {
  border: none;
  border-radius: .2rem;
}
`

const generalCss = `
${resetCss}

#wwi-container h1, #wwi-container h2, #wwi-container h3 {
  font-weight: bold;
}
`

const buttonCss = `
#wwi-container .wwi-button {
  background-color: rgba(var(--dark-color), .6);
  color: white;
  transition: background-color .4s ease, color .4s ease;
  padding: 0.3rem 0.6rem;
  border: none;
}
#wwi-container .wwi-button path {
  transition: stroke .4s ease, fill .4s ease;
}
#wwi-container .wwi-button circle {
  transition: fill .4s ease;
}

#wwi-container .wwi-button:hover {
  background-color: rgb(var(--main-color));
  color: white;
}

#wwi-container .wwi-button--light {
  background-color: transparent;
  color: rgb(var(--dark-color));
}

#wwi-container .buttons-container {
  display: flex; 
  gap: .25rem;
}

#wwi-container .wwi-button[tooltip] {
  position: relative;
}

#wwi-container .wwi-button[tooltip]:before {
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  content: attr(tooltip);
  position: absolute;
  top: 0;
  background-color: white;
  translate: -75% -75%;
  color: black;
  width: 160px;
  font-size: .6rem;
  font-weight: 600;
  transition: opacity .4s ease, translate .4s ease;
  padding: .3rem;
  border-radius: 0.25rem;
  display: block;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
}

#wwi-container .wwi-button[tooltip]:hover:before {
  opacity: 1;
  translate: -75% calc(-100% - 4px);
}

#wwi-container .wwi-button[tooltip]:after {
  opacity: 0;
  position: absolute;
  top: -4px;
  right: 8px;
  z-index: 2;
  content: "";
  width: 0; 
  height: 0; 
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;  
  border-top: 4px solid white;
  transition: opacity .4s ease;
}

#wwi-container .wwi-button[tooltip]:hover:after {
  opacity: 1;
}

#wwi-container .wwi-button[tooltip][tooltip-direction=bottom]:before {
  bottom: 0;
  top: unset;
  translate: -10% 75%;
}

#wwi-container .wwi-button[tooltip][tooltip-direction=bottom]:hover:before {
  translate: -10% calc(100% + 4px);
}

#wwi-container .wwi-button[tooltip][tooltip-direction=bottom]:after {
  rotate: 180deg;
  right: 8px;
  top: unset;
  bottom: -4px;
}
`

const cardsCss = `
${buttonCss}
#wwi-container {
  --wwi-rotation: 6deg;
  position: fixed;
  bottom: 3rem;
  right: 6rem;
  height: 200px;
  width: 160px;
  transform-origin: bottom;
  transition: bottom .4s ease, scale .4s ease;
  scale: 0.6;
}

#wwi-container:hover {
  bottom: 2rem;
  scale: 1;
}

#wwi-container .wwi-tooltip {
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

#wwi-container .wwi-card {
  display: block;
  position: absolute;
  inset: 0;
  transform-origin: 40% 100%;
  transition: all .4s ease;
  border-radius: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: 200px;
  width: 160px;
  rotate: calc(var(--wwi-rotation) * var(--card-index));
  filter: brightness(0.8);
}

#wwi-container .wwi-card--new {
  animation: getInHere .7s forwards cubic-bezier(0,.52,.36,.94);
}

#wwi-container .wwi-card:hover {
  filter: brightness(1);
  top: -2rem;
}

#wwi-container .wwi-card:hover .wwi-tooltip {
  opacity: 1;
}

#wwi-container .wwi-card--pad-left-a-little {
  margin-left: -1.25rem;
}

#wwi-container .wwi-card--pad-left {
  margin-left: -2.5rem;
}
#wwi-container .wwi-card--pad-right {
  margin-left: 2.5rem;
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

const screenCss = `
  #wwi-container .wwi-screen-container {
    aspect-ratio: 3 / 1;
    min-width: 300px;
    display: flex;
    padding: .5rem;
    border-radius: .5rem;
    background-color: rgba(0,0,0,0);
    transition: scale .2s ease, background-color .2s ease;
    text-decoration: none;
  }
  #wwi-container .wwi-screen-container:hover {
    scale: 1.03;
    background-color: rgba(0,0,0,.03);
  }
  #wwi-container .wwi-screen-container__screen {
    flex-basis: 40%;
    max-width: 40%;
    border-radius: .5rem;
  }

  #wwi-container .wwi-screen-container__meta {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    max-width: 60%;
    padding: .5rem;
    color: rgb(var(--dark-color));
  }

  #wwi-container .wwi-screen-container__title {
    font-weight: bold;
    padding-bottom: .3rem;
  }

  #wwi-container .wwi-screen-container__subtitle {
    font-size: smaller;
    opacity: 0.8;
  }

  #wwi-container .wwi-screen-container__subtitle > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const floatingButtonCss = `
#wwi-container #wwi-show-button {
  padding: 0.75rem;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.7);
  opacity: .5;
  color: white;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  transition: opacity .4s ease, bottom .4s ease;
  z-index: 2;
}

#wwi-container #wwi-show-button:hover {
  opacity: 1;
}

#wwi-container #wwi-show-button svg {
}
#wwi-container #wwi-show-button path {
  stroke: white;
}


#wwi-container #wwi-show-button[data-count]:after {
  content: attr(data-count);
  font-size: smaller;
  position: absolute;
  top: 0;
  right: 0;
  translate: 25% -25%;
  background: rgba(var(--main-color), .6);
  color: white;
  padding: .2rem .4rem;
  border-radius: 50%;
}
`

const panelCss = `
${floatingButtonCss}
${buttonCss}
${screenCss}
#wwi-panel {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  translate: 0 100%;
  transition: translate .4s ease, box-shadow .4s ease;
  box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
  color: rgb(var(--dark-color));
  padding: 1rem;
  box-sizing: border-box;
}

#wwi-container.open #wwi-panel {
  translate: 0 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

#wwi-panel #wwi-panel-screens-container {
  position: relative;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  height: 100%;
  scrollbar-color: rgba(100, 108, 255, 0.3) white;
  scrollbar-width: thin;
  padding: .5rem;
  padding-top: 3rem;
}

#wwi-panel #wwi-panel-controls {
  position: fixed;
  top: 0;
  left: 1rem;
  right: 1rem;
  bottom: auto;
  padding: .5rem 1rem;
  border-bottom: 1.5px solid rgba(var(--dark-color), 0.15);
  display: flex;
  justify-content: space-between;
}

#wwi-panel #wwi-panel-controls label {
  font-weight: bold;
  font-size: 1.2rem;
}


#wwi-panel .wwi-screen {
  display: block;
  height: 150px;
  width: 200px;
  transition: scale .4s ease, box-shadow .4s ease;
  box-shadow: 0 0 0 0 rgba(var(--main-color), .2);
  border: 1px solid rgba(var(--main-color), .2);
  border-radius: .2rem;
  
}

#wwi-panel .wwi-screen:hover {
  scale: 1.05;
  box-shadow: 0 0 4px 4px rgba(var(--main-color), .2);
}
`

const drawerCss = `
${buttonCss}
${floatingButtonCss}
${screenCss}
#wwi-drawer {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  position: fixed;
  inset: 0;
  right: auto;
  width: 360px;
  padding: 1rem;
  color: rgb(var(--dark-color));
  box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
  translate: -100% 0;
  transition: translate .4s ease, box-shadow .4s ease;
}

#wwi-container.open #wwi-drawer {
  translate: 0 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

#wwi-container #wwi-panel-screens-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


#wwi-container .control-buttons {
  display: flex; 
  justify-content: space-between;
}
`

const applyCss = function (options: WhereWasIOptions) {
  logOptions('applyCss', options)
  const styleTag = document.createElement('style')
  styleTag.innerHTML = generalCss

  if (options.style === "panel") {
    styleTag.innerHTML += panelCss
  }

  if (options.style === 'drawer') {
    styleTag.innerHTML += drawerCss
  }

  if (options.style === "cards") {
    styleTag.innerHTML += cardsCss
  }

  document.head.append(styleTag)
}

export default applyCss
