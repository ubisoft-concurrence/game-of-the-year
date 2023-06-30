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

let gang1=[];
let gang2=[];

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
        + `|` + element.character_name  + `|` + element.class_name  + `| LV:` + element.character_level  + `|` + `</div>`;
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
        output2.innerHTML += `<option value="bus${x}">` + element.vehicle_name  + `</div>`;
        output3.innerHTML += `<option value="bus${x}">` + element.vehicle_name  + `</div>`;
     });
      
     })

     function play() {
      var audio = document.getElementById("audio");
      audio.play();
    }
    play();