const classSelect = document.getElementById('class-select');
const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const skin1 = document.getElementById('skin1');
const skin2 = document.getElementById('skin2');

classSelect.addEventListener('change', () => {
  let selectedClass = classSelect.value;
  skin1.src = `/images/sprites/icon/${selectedClass}1.png`;
  skin1.alt = selectedClass;
  skin2.src = `/images/sprites/icon/${selectedClass}2.png`;
  skin2.alt = selectedClass;

  radio1.value = `${selectedClass}1`;
  radio2.value = `${selectedClass}2`;
})

radio1.addEventListener('change', () => {
  if (radio1.checked) {
    skin1.classList.add('selected');
    skin2.classList.remove('selected');
  }
});

radio2.addEventListener('change', () => {
  if (radio2.checked) {
    skin2.classList.add('selected');
    skin1.classList.remove('selected');
  }
});

const messageElement = document.getElementById('stats-jobs');

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


document.getElementById("CharaCreator").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  var form = document.getElementById("CharaCreator");
  var formData = new FormData(form);
  console.log(data)

  fetch("http://localhost:5000/character/create", {
    method: "POST",
    body: formData
  })
    .then(function (response) {
      // Gérer la réponse de la route "/characters" ici
      alert("Character created !")
    })
    .catch(function (error) {
      // Gérer les erreurs ici
      alert("Some data is missing...")
    });
});



document.getElementById("BusCreator").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  var form = document.getElementById("BusCreator");
  var formData = new FormData(form);
  console.log(data)

  fetch("http://localhost:5000/vehicle/create", {
    method: "POST",
    body: formData
  })
    .then(function (response) {
      // Gérer la réponse de la route "/vehicles" ici
      alert("Vehicle created !")
    })
    .catch(function (error) {
      // Gérer les erreurs ici
      alert("Some data is missing...")
    });
});  