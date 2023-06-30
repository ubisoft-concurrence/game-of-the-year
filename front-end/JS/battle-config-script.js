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