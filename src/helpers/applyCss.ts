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

const footerCss = `
#wwi-container #wwi-footer {
  display: flex;
  text-decoration: none;
  gap: 6px;
  justify-content: flex-end;
  align-items: center;
}

#wwi-container  #wwi-footer-disclaimer {
  font-size: 10px;
  font-weight: bolder;
}
#wwi-container  #wwi-footer-disclaimer small {
  display: block;
}

#wwi-container #wwi-footer #wwi-footer-links {
  display: flex;
  justify-content: space-between;
}

#wwi-container #wwi-footer a {
  color: black;
  font-weight: bold;
  font-size: 9px;
}
`

const buttonCss = `
#wwi-container .wwi-button {
  background-color: rgba(var(--dark-color), .6);
  color: white;
  transition: background-color .4s ease, color .4s ease;
  padding: 0.3rem 0.6rem;
  border: none;
  cursor: pointer;
  display:inline-flex;
  flex-direction: column;
  justify-content: center;
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

#wwi-container [tooltip] {
  position: relative;
}

#wwi-container [tooltip]:before {
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  text-align: center;
  content: attr(tooltip);
  position: absolute;
  top: 0;
  right: 25%;
  font-size: 10px;
  background-color: white;
  translate: 0 -75%;
  color: black;
  width: 160px;
  font-weight: 600;
  transition: opacity .4s ease, translate .4s ease;
  padding: .3rem;
  border-radius: 0.25rem;
  display: block;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
}

#wwi-container [tooltip]:hover:before {
  opacity: 1;
  translate: 0 calc(-100% - 4px);
}

#wwi-container [tooltip]:after {
  opacity: 0;
  position: absolute;
  top: -5px;
  right: calc(25% + 8px);
  z-index: 2;
  content: "";
  width: 0; 
  height: 0; 
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;  
  border-top: 4px solid white;
  transition: opacity .4s ease;
}

#wwi-container [tooltip]:hover:after {
  opacity: 1;
}

#wwi-container [tooltip][tooltip-direction=bottom]:before {
  bottom: 0;
  top: unset;
  translate: 0 75%;
  right: 25%;
}

#wwi-container [tooltip][tooltip-direction=bottom]:hover:before {
  translate: 0 calc(100% + 4px);
}

#wwi-container [tooltip][tooltip-direction=bottom]:after {
  rotate: 180deg;
  right: calc(25% + 8px);
  top: unset;
  bottom: -4px;
}


#wwi-container [tooltip][tooltip-direction="top-left"]:before {
  translate: 10% -75%;
}

#wwi-container [tooltip][tooltip-direction="top-left"]:hover:before {
  translate: 10% calc(-100% - 3px);
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
    width: 300px;
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
    height: fit-content;
    aspect-ratio: 6 / 5;
    align-self: center;
  }

  #wwi-container .wwi-screen-container__meta {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;
    max-width: 60%;
    padding: .5rem;
    color: rgb(var(--dark-color));
    align-items: baseline;
    overflow: hidden;
  }

  #wwi-container .wwi-screen-container__meta button {
    align-self: end;
  }

  #wwi-container .wwi-screen-container__title {
    font-weight: bold;
    margin-bottom: .3rem;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  #wwi-container .wwi-screen-container__subtitle {
    font-size: smaller;
    opacity: 0.8;
    flex: 1;
    max-width: 100%;
  }

  #wwi-container .wwi-screen-container__subtitle > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`

const floatingButtonCss = (options: WhereWasIOptions) => `
#wwi-container #wwi-show-button {
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${options.showButtonOptions?.color ?? 'rgba(0,0,0,0.7)'};
  opacity: .5;
  color: white;
  position: fixed;
  transition: opacity .4s ease, bottom .4s ease;
  z-index: 1001;
  cursor: pointer;
}

#wwi-container .wwi-show-button--position-bottom-right {
  bottom: -5rem;
  right: 2rem;
}
#wwi-container .wwi-show-button--position-bottom-left {
  bottom: -5rem;
  left: 2rem;
}

#wwi-container .wwi-show-button--position-top-right {
  top: 5rem;
  right: -5rem;
}
#wwi-container .wwi-show-button--position-top-left {
  top: 5rem;
  left: 2rem;
}

#wwi-container .wwi-show-button--position-bottom-right.wwi-show-button--show {
  bottom: 2rem;
  right: 2rem;
  animation: appears .6s ease forwards;
}

#wwi-container .wwi-show-button--position-bottom-left.wwi-show-button--show {
  bottom: 2rem;
  left: 2rem;
  animation: appears .6s ease forwards;
}

#wwi-container.open #wwi-show-button.wwi-show-button--position-bottom-right, 
#wwi-container.open #wwi-show-button.wwi-show-button--position-bottom-left {
  animation: disappears .6s ease forwards;
  bottom: -5rem;
}

#wwi-container .wwi-show-button--position-top-right.wwi-show-button--show {
  animation: appears-right .6s ease forwards;
}

#wwi-container .wwi-show-button--position-top-left.wwi-show-button--show {

  animation: appears-left .6s ease forwards;
}

#wwi-container.open #wwi-show-button.wwi-show-button--position-top-right {
  animation: disappears-right .6s ease forwards;
  right: -5rem;
}
#wwi-container.open #wwi-show-button.wwi-show-button--position-top-left {
  animation: disappears-left .6s ease forwards;
  left: -5rem;
}

#wwi-container #wwi-show-button:hover {
  opacity: 1;
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

@keyframes appears {
  0% {
    bottom: -5rem;
  }
  100% {
    bottom: 2rem;
  }   
}

@keyframes disappears {
  0% {
    bottom: 2rem;
  }
  100% {
    bottom: -5rem;
  }
}

@keyframes appears-left {
  0% {
    left: -5rem;
  }
  100% {
    left: 2rem;
  }   
}

@keyframes disappears-left {
  0% {
    left: 2rem;
  }
  100% {
    left: -5rem;
  }
}

@keyframes appears-right {
  0% {
    right: -5rem;
  }
  100% {
    right: 2rem;
  }
}

@keyframes disappears-right {
  0% {
    right: 2rem;
  }
  100% {
    right: -5rem;
  }
}
`

const panelCss = (options: WhereWasIOptions) => `
${floatingButtonCss(options)}
${buttonCss}
${screenCss}
${footerCss}
#wwi-panel {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  translate: 0 100%;
  transition: translate .4s ease, box-shadow .4s ease;
  box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
  color: rgb(var(--dark-color));
  padding: 0 1rem .5rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

#wwi-container.open #wwi-panel {
  translate: 0 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

#wwi-panel #wwi-screens-container {
  position: relative;
  display: flex;
  gap: 1rem;
  padding: .25rem 0;
  overflow-x: auto;
  height: 100%;
  scrollbar-color: rgba(100, 108, 255, 0.3) transparent;
  scrollbar-width: thin;
}

#wwi-panel #wwi-panel-controls {
  padding: .5rem 1rem;
  border-bottom: 1.5px solid rgba(var(--dark-color), 0.15);
  display: flex;
  justify-content: space-between;
}

#wwi-panel #wwi-panel-controls label {
  font-weight: bold;
  font-size: 1.2rem;
}
`

const drawerCss = (options: WhereWasIOptions) => `
${buttonCss}
${floatingButtonCss(options)}
${screenCss}
${footerCss}
#wwi-drawer {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  position: fixed;
  inset: 0;
  right: auto;
  padding: 1rem;
  color: rgb(var(--dark-color));
  box-shadow: 0 0 0 0 rgba(0,0,0,0.15);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  translate: -100% 0;
  transition: translate .4s ease, box-shadow .4s ease;
}

#wwi-container.open #wwi-drawer {
  translate: 0 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

#wwi-container #wwi-screens-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  max-height: 100vh;
  scrollbar-color: rgba(100, 108, 255, 0.3) transparent;
  scrollbar-width: thin;
  overflow: auto;
  padding: 0 .5rem
}

#wwi-container #wwi-panel-screens-title {
  display: inline-flex;
  gap: .5rem;
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

  if (options.style === 'panel') {
    styleTag.innerHTML += panelCss(options)
  }

  if (options.style === 'drawer') {
    styleTag.innerHTML += drawerCss(options)
  }

  if (options.style === 'cards') {
    styleTag.innerHTML += cardsCss
  }

  document.head.append(styleTag)
}

export default applyCss
