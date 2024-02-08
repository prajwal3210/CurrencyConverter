const Base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let Currcode in countryList) {
    let newOp = document.createElement("option");
    newOp.innerText = Currcode;
    newOp.value = Currcode;
    select.append(newOp);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  console.log(element.value);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amVal = amount.value;
  console.log(amVal);
  console.log(fromCurr.value, toCurr.value);

  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAm = rate * amVal;
  console.log(finalAm);

  msg.innerText = `${amVal} ${fromCurr.value} = ${finalAm} ${toCurr.value}`;
});
