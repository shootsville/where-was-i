
const css = `
  :root {
    --where-was-i-rotation: 6deg;
  }

  #where-was-i-container {
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

const applyCss = function(options: WhereWasIOptions) {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = css;

  document.head.append(styleTag);
}

export default applyCss;