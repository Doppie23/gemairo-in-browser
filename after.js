(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach((e) => {
      if (e.target.id === "idBerekening" && e.target.className === "tabsheet active") {
        const inputbox = e.target.querySelector(".widget").querySelector(".gemairo");
        if (inputbox === null) {
          const cijferNodigHTMLObject = `<form class='gemairo'>
                                <input maxlength="4" type="number" autocomplete="off" name="onvoldoende_grens" class='gemairo_input' placeholder='Wat wil ik staan?'/>
                                <input maxlength="4" type="number" autocomplete="off" name="weging" class='gemairo_weging' placeholder='Weging'/>
                                <input type="submit" value="Bereken" formnovalidate />
                              </form>`;
          e.target.querySelector(".widget").insertAdjacentHTML("beforeend", cijferNodigHTMLObject);

          const formCijferNodig = e.target.querySelector(".widget").querySelector(".gemairo");

          formCijferNodig.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const inputdata = [...data.entries()];
            const WatWilIkStaan = inputdata[0][1];
            const weging = inputdata[1][1];

            let nodigcijfer = BerekenCijferNodig(WatWilIkStaan, weging);

            let htmlCijferNodigElement = document.querySelector(".textcijfernodig");
            if (htmlCijferNodigElement === null) {
              htmlCijferNodigElement = `<div class=textcijfernodig>Je moet een ${nodigcijfer} halen.</div>`;
              formCijferNodig.insertAdjacentHTML("afterend", htmlCijferNodigElement);
            } else {
              htmlCijferNodigElement.textContent = `Je moet een ${nodigcijfer} halen.`;
            }
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

  let total_weging = 0;
  weights.forEach((e) => {
    total_weging += parseInt(e);
  });
  total_weging += parseInt(weging);

  let wat_moet_ik_halen =
    (parseFloat(onvoldoende_grens) * total_weging - totaalcijfers_incweging) / parseInt(weging);
  return wat_moet_ik_halen;
}

function getCijfer() {
  let cijfers = [];
  let weights = [];
  const table = document.querySelector(".cijfer-berekend").querySelectorAll("tbody td");
  table.forEach((element) => {
    if (element.getAttribute("data-ng-if") === "vm.showCijfer") {
      cijfers.push(parseFloat(element.textContent.replace(",", ".")));
    }
    if (element.getAttribute("data-ng-if") === "vm.showWeegfactor") {
      weights.push(parseFloat(element.textContent));
    }
  });

  return [cijfers, weights];
}
