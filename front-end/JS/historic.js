//FETCH FOR HISTORIC
const rankDiv = document.querySelector('.players-rank');
const histoDiv = document.querySelector('.battle-historic');

fetch('http://localhost:3000/historic')
  .then(response => response.json())
  .then(characters => {
    let i = 0;
    console.log(characters);
    console.log(characters[1]);
    characters[0].forEach(element => {
      i++;
      rankDiv.innerHTML += `<div class="player">`+
                           `<p>` + i + `</p>
                            <p>` + element.character_name + `</p>
                            <p>` + element.character_level + `</p>
                            </div>`;
    });
    
    const battles = {};

    characters[1].forEach((item) => {
        const battleId = item.battle_id;
        if (!battles.hasOwnProperty(battleId)) {
            battles[battleId] = [];
        }
        battles[battleId].push(item);
        });

    console.log("Listes des batailles:");
    console.log(battles[1][1].character_name);
    console.log(Object.keys(battles).length);
    

    for (let j = 1; j <= Object.keys(battles).length; j++) {
      histoDiv.innerHTML += `<div id="battle${j}" class="battle">BATTLE ${j}</div>`
      histoDiv.innerHTML += `<div id="winners${j}" class="winners">WINNERS<div>`
      histoDiv.innerHTML += `<div id="losers${j}" class="losers">LOSERS<div>`
                             
      let battleDiv = document.getElementById(`battle${j}`)
      let winnersDiv = document.getElementById(`winners${j}`)
      let losersDiv = document.getElementById(`losers${j}`)

      for (let k = 0; k < battles[j].length; k++) {
        if (battles[j][k].result == "win")
            winnersDiv.innerHTML += `<p>` + battles[j][k].character_name + `</p>`
        else
            losersDiv.innerHTML += `<p>` + battles[j][k].character_name + `</p>`
      }
      battleDiv.appendChild(winnersDiv);
      battleDiv.appendChild(losersDiv);
    }
});
