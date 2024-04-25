import renderHistory from "./helpers/renderHistory";
import createHistory from "./helpers/createHistory";
import applyCss from "./helpers/applyCss";



const whereWasI = function(options: WhereWasIOptions = { maxAmount: 12, style: "cards" }) {
  let storage = JSON.parse(window.sessionStorage.getItem("items") ?? "[]") as Array<LocationObject>;

  window.addEventListener("navigate", () => {
    createHistory(location.href, storage, options).then(res => {
      storage = res;
      window.sessionStorage.setItem("items", JSON.stringify(storage));
      renderHistory(storage, options)
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    createHistory(location.href, storage, options).then(res => {
      storage = res;
      window.sessionStorage.setItem("items", JSON.stringify(storage));
      renderHistory(storage, options)
    });

    applyCss(options);
  });

  
}

export {
  whereWasI
}

export default whereWasI();
