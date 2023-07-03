//FETCH FOR CHARACTERS
const output = document.getElementById('ListPlayer');
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    let i = 0
    characters.forEach(element => {
      i++;
      output.innerHTML += `<div class='player divbackground textDiv' draggable='true' ondragstart='drag(event)' id='drag${i}'>`
        + `<p class="pseudo">` + element.character_name + `</p><p>` + element.class_name + `</p><p> LV:` + element.character_level + `</p>` + `</div>`;
    });
  })
//FETCH FOR VEHICLES
const output2 = document.getElementById('buschoicesave');
const output3 = document.getElementById('buschoicesave2');
fetch('http://localhost:3000/vehicles')
  .then(response => response.json())
  .then(vehicles => {
    let x = 0
    vehicles.forEach(element => {
      x++;
      output2.innerHTML += `<option value="bus${x}">` + element.vehicle_name + `</div>`;
      output3.innerHTML += `<option value="bus${x}">` + element.vehicle_name + `</div>`;
    });
  })

//FUNCTION FOR VEHICLE LIST SELECTION PERMISION
// function listOptions(selectedValue,event) {
//   const lists = document.querySelectorAll('.dropdown');
//   for (let i = 0; i < lists.length; i++) {
//     const list = lists[i];

//     for (let j = 0; j < list.length; j++) {
//       const option = list.options[j];

//       if (option.value === selectedValue && list.id !== event.target.id) {
//         option.disabled = true;
//         option.selected = false;
//       } else {
//         option.disabled = false;
//       }
//     }
//   }
// }

//DRAG AND DROP
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

//BATTLE CONFIGURATION
const divGang1 = document.getElementById("Gang1");
const divGang2 = document.getElementById("Gang2");
const busGang1Select = document.getElementById("buschoicesave");
const busGang2Select = document.getElementById("buschoicesave2");
const startBtn = document.getElementById("btn-start");

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const busGang1 = busGang1Select.options[busGang1Select.selectedIndex].textContent;
  const busGang2 = busGang2Select.options[busGang2Select.selectedIndex].textContent;

  let gang1 = [];
  let gang2 = [];

  gang1.push(busGang1);
  gang2.push(busGang2);

  let fighters1 = document.querySelectorAll("#Gang1 .player");
  let fighters2 = document.querySelectorAll("#Gang2 .player");

  fighters1.forEach(function (fighter) {
    let pseudo = fighter.querySelector(".pseudo").textContent;
    gang1.push(pseudo);
  });

  fighters2.forEach(function (fighter) {
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
    .then(function (response) {
      if (response.ok) {
        window.location.href='./turn-based-battle.html'
      }
      
    })
    .catch(function (error) {
      alert("Some data is missing...");
    });
});

function play() {
  var audio1 = document.getElementById("audioBegin");
  var audio2 = document.getElementById("audio");
  audio1.play();
  audio2.play();
}
play();