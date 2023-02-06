// this code will be executed after page load
(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach((e) => {
      if (e.target.id === "idBerekening" && e.target.className === "tabsheet active") {
        const inputbox = e.target.querySelector(".widget").querySelector(".gemairo");
        if (inputbox === null) {
          const htmlElement = `<div class='gemairo'>
                                <input class='gemairo_input' placeholder='Wat wil ik staan?'/>
                                <input class='gemairo_weging' placeholder='Weging'/>
                              </div>`;
          e.target.querySelector(".widget").insertAdjacentHTML("beforeend", htmlElement);
        }
      }
    });
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
})();
