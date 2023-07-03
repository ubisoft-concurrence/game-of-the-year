//For checkboxes skin
const classSelect = document.getElementById('class-select');
const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const skin1 = document.getElementById('skin1');
const skin2 = document.getElementById('skin2');

classSelect.addEventListener('change', () => {
  let selectedClass = classSelect.value;
  skin1.src = `../../images/sprites/icon/${selectedClass}1.png`;
  skin1.alt = selectedClass;
  skin2.src = `../../images/sprites/icon/${selectedClass}2.png`;
  skin2.alt = selectedClass;

  radio1.value = `${selectedClass}1`;
  radio2.value = `${selectedClass}2`;
})

radio1.addEventListener('change', () => {
  if (radio1.checked) {
    new Audio("../../sounds/effects/Select.wav").play();
    skin1.classList.add('selected');
    skin2.classList.remove('selected');
  }
});

radio2.addEventListener('change', () => {
  if (radio2.checked) {
    new Audio("../../sounds/effects/Select.wav").play();
    skin2.classList.add('selected');
    skin1.classList.remove('selected');
  }
});

//For stats
const messageElement = document.getElementById('stats-jobs');
messageElement.innerHTML = 'Slasher<br> HP : 50<br> ATK : 15';

classSelect.addEventListener('change', () => {
  if (classSelect.value == "slasher") {
    messageElement.innerHTML = 'Slasher<br> HP : 50<br> ATK : 15';
  } else if (classSelect.value == "wall") {
    messageElement.innerHTML = 'Wall<br> HP : 70<br> ATK : 20';
  } else if (classSelect.value == "killer") {
    messageElement.innerHTML = 'Killer<br> HP : 40<br> ATK : 25';
  } else if (classSelect.value == "monster") {
    messageElement.innerHTML = 'Monster<br> HP : 100<br> ATK : 10';
  } else if (classSelect.value == "gunner") {
    messageElement.innerHTML = 'Gunner<br> HP : 60<br> ATK : 15';
  }
});

// For bus color
const selectColor= document.getElementById('color-select');
const imgSelect = document.getElementById('img-select');

selectColor.addEventListener('change', () => {
  let colorSelected = selectColor.value;

  imgSelect.src = `../../images/sprites/bus/${colorSelected}.png`

});


//Fetch character
const formCharacter = document.getElementById('CharaCreator');

formCharacter.addEventListener("submit", function (event) {
  event.preventDefault(); 
  
  let classId = document.getElementById("class-select").value
  if (classId == "slasher") {
    classId = 1;
  } else if (classId == "wall") {
    classId = 2;
  } else if (classId =="killer") {
    classId = 3;
  } else if (classId == "monster") {
    classId = 4;
  } else if (classId == "gunner") {
    classId = 5;
  }
  
  const dataCharacter = {
    character_name: document.getElementById("chara-name").value,
    skin: document.querySelector('input[name="skin"]:checked').value,
    class_id: classId
  };
  console.log(dataCharacter);
  
  fetch("http://localhost:3000/character/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataCharacter)
    })
    .then(function(response) {
      if (response.ok) {
        new Audio("../../sounds/voices/narrator/NewChallenger.mp3").play();
        alert("Character created!");
      }
    })
    .catch(function(error) {
      // Gérer les erreurs ici
      alert("Some data is missing...");
  });
});


//Fetch vehicles
const formVehicle = document.getElementById('BusCreator');

formVehicle.addEventListener("submit", function (event) {
  event.preventDefault(); 
  
  const dataVehicle = {
    vehicle_name: document.getElementById("vehicle-name").value,

    color: document.getElementById('color-select').value,

    buff: document.getElementById('buff-select').value,
    nerf: document.getElementById('debuff-select').value,
  };
  console.log(dataVehicle);
  
  fetch("http://localhost:3000/vehicle/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataVehicle)
    })
    .then(function(response) {
      if (response.ok) {
        new Audio("../../sounds/voices/narrator/Great.mp3").play();
        alert("Vehicle created!");
      }
    })
    .catch(function(error) {
      // Gérer les erreurs ici
      alert("Some data is missing...");
  });
});

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}
play();

