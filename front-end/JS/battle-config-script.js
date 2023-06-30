const divGang1 = document.getElementById("Gang1");
const divGang2 = document.getElementById("Gang2");
let gang1 = [];
let gang2 = [];

function drop(event) {
  event.preventDefault();
  let targetDiv = event.currentTarget;
  let pseudo = event.dataTransfer.getData("text");
  let pElement = document.createElement("p");
  pElement.textContent = pseudo;

  if (targetDiv.id === "Gang1") {
    gang1.push(pseudo);
    divGang1.appendChild(pElement);
  } else if (targetDiv.id === "Gang2") {
    gang2.push(pseudo);
    divGang2.appendChild(pElement);
  }

  console.log(gang1);
  console.log(gang2);
}

function drag(event) {
  event.dataTransfer.setData("text", event.target);
}

function allowDrop(event) {
  event.preventDefault();
}