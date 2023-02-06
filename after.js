// this code will be executed after page load
(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach((e) => {
      if (e.target.id === "idBerekening" && e.target.className === "tabsheet active") {
        const inputbox = e.target.querySelector(".widget").querySelector(".gemairo");
        if (inputbox === null) {
          const htmlElement = `<form class='gemairo'>
                                <input name="onvoldoende_grens" class='gemairo_input' placeholder='Wat wil ik staan?'/>
                                <input name="weging" class='gemairo_weging' placeholder='Weging'/>
                                <input type="submit" hidden />
                              </form>`;
          e.target.querySelector(".widget").insertAdjacentHTML("beforeend", htmlElement);

          const form = e.target.querySelector(".widget").querySelector(".gemairo");
          console.log(form);
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const inputdata = [...data.entries()];
            let nodigcijfer = BerekenCijferNodig(inputdata[0][1], inputdata[1][1]);
            console.log(nodigcijfer);
          });
        }
      }
    });
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
})();

function BerekenCijferNodig(onvoldoende_grens, weging) {
  let [cijfers, weights] = getCijfer();
  let totaalcijfers_incweging = 0;

  for (let i = 0; i < cijfers.length; i++) {
    const cijfer = cijfers[i];
    const weging = weights[i];
    totaalcijfers_incweging += cijfer * weging;
  }

  let wat_moet_ik_halen = (onvoldoende_grens * weging) / cijfers.length++ - totaalcijfers_incweging;
  return wat_moet_ik_halen;
}

function getCijfer() {
  let cijfers = [];
  let weights = [];
  const table = document.querySelector(".cijfer-berekend").querySelectorAll("tbody td");
  console.log(table);
  table.forEach((element) => {
    if (element.getAttribute("data-ng-if") === "vm.showCijfer") {
      cijfers.push(element.textContent);
    }
    if (element.getAttribute("data-ng-if") === "vm.showWeegfactor") {
      weights.push(element.textContent);
    }
  });

  return [cijfers, weights];
}
