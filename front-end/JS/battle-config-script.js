let gang1=[];
let gang2=[];
function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
function drop(event) {   
    event.preventDefault();
    let player = event.dataTransfer.getData("text")
    let playerDiv = event.target
    let characterName = playerDiv.querySelector("p")
  
    if (event.target.id === "gang1") {
      gang1.push(characterName); 
    } else if (event.target.id === "gang2") {
      gang2.push(characterName);
    }

    console.log(gang1);
    console.log(gang2);

    event.currentTarget.appendChild(document.getElementById(player));

  }

  function getPlayerPseudo(playerDiv) {
    let playerName = playerDiv.getElementByTagName("p")[0].textContent
    console.log(playerName);
    return playerName
  }

