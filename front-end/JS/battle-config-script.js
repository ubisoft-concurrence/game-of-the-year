const output = document.getElementById('ListPlayer');
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    console.log(characters)
    let i = 0
    characters.forEach(element => {
      i++;
      console.log(element)
      output.innerHTML += `<div class='player divbackground textDiv' draggable='true' ondragstart='drag(event)' id='drag${i}'>`
        + `<p class="pseudo">` + element.character_name + `</p><p>` + element.class_name + `</p><p> LV:` + element.character_level + `</p>` + `</div>`;
    });
  })

const output2 = document.getElementById('buschoicesave');
const output3 = document.getElementById('buschoicesave2');
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


const divGang1 = document.getElementById("Gang1");
const divGang2 = document.getElementById("Gang2");

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(even) {   
  even.preventDefault();
  var fetchData = even.dataTransfer.getData("text");
  even.currentTarget.appendChild(document.getElementById(fetchData));
}


const busGang1Select = document.getElementById("buschoicesave");
const busGang2Select = document.getElementById("buschoicesave2");
const startBtn = document.getElementById("btn-start");

startBtn.addEventListener("click", () => {
  const busGang1 = busGang1Select.options[busGang1Select.selectedIndex].textContent;
  const busGang2 = busGang2Select.options[busGang2Select.selectedIndex].textContent;
  
  let gang1 = [];
  let gang2 = [];

  gang1.push(busGang1);
  gang2.push(busGang2);

  let fighters1 = document.querySelectorAll("#Gang1 .player");
  let fighters2 = document.querySelectorAll("#Gang2 .player");
  
  fighters1.forEach(function(fighter) {
    let pseudo = fighter.querySelector(".pseudo").textContent;
    gang1.push(pseudo);
  });

  fighters2.forEach(function(fighter) {
    let pseudo = fighter.querySelector(".pseudo").textContent;
    gang2.push(pseudo);
  });

  const dataGang = {
    liste1: gang1,
    liste2: gang2 
  };

  fetch("http://localhost:3000/choice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataGang)
    })
    .then(function(response) {
      if (response.ok) {
        alert("Choice updated!");
      }
    })
    .catch(function(error) {
      // Gérer les erreurs ici
      alert("Some data is missing...");
  });
});