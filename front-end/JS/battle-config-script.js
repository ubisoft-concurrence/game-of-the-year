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

  let gang1 = [];
  let gang2 = [];
}

  let output = document.getElementById('ListPlayer');
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      console.log(characters)
      let i = 0
      characters.forEach(element => {
        i++;
        console.log(element)
        output.innerHTML += `<div class='divbackground textDiv' draggable='true' ondragstart='drag(event)' id='drag${i}'>`
          + `|` + element.character_name + `|` + element.class_name + `| LV:` + element.character_level + `|` + `</div>`;
      });
    })

  let output2 = document.getElementById('buschoicesave');
  let output3 = document.getElementById('buschoicesave2');
  fetch('http://localhost:3000/vehicles')
    .then(response => response.json())
    .then(vehicles => {
      console.log(vehicles)
      let x = 0
      vehicles.forEach(element => {
        x++;
        console.log(element)
        output2.innerHTML += `<option value="bus${x}">` + element.vehicle_name + `</div>`;
        output3.innerHTML += `<option value="bus${x}">` + element.vehicle_name + `</div>`;
      });
    })
