const getFighters = document.querySelector('#getFighters')
const busContainer = document.querySelector('.busContainer')

// const greenBar = document.querySelectorAll('.greenbar')
// let push = 75;
// pointVie.innerHTML = push;


//             function pushVie(){
//                 push -= 15; // Réduire la valeur de push de 10

//                 if (push < 0) {
//                     push = 0; // Assurer que la valeur de push ne devienne pas négative
//                 }
//                 let table = [];
//                 pointVie[i].innerHTML = push
//                 greenBar[i].style.width =  push * 1.33 + '%';
//                 table.push(push);

//                 if(push == 0){
//                     img[i].style.backgroundPositionX = '50%'
//                 }
//             }
//                 setInterval(pushVie, 1000,)




// console.log(pointVie.textContent);

// Définition des joueurs

// const joueur1 = {
//     nom: "Joueur 1",
//     pointsDeVie: 100,
//     attaqueMin: 8,
//     attaqueMax: 15
// };

// const joueur2 = {
//     nom: "Joueur 2",
//     pointsDeVie: 100,
//     attaqueMin: 8,
//     attaqueMax: 15
// };

// // Fonction pour générer un nombre aléatoire entre min et max
// function genererNombreAleatoire(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Fonction pour effectuer une attaque d'un joueur à un autre

// function attaquer(attaquant, defenseur) {
//     const pointsDeDegats = genererNombreAleatoire(attaquant.attaqueMin, attaquant.attaqueMax);
//     defenseur.pointsDeVie -= pointsDeDegats;
//     console.log(`${attaquant.nom} attaque ${defenseur.nom} et lui inflige ${pointsDeDegats} points de dégâts.`);
// }

// // Fonction pour vérifier si un joueur est en vie
// function estEnVie(joueur) {
//     return joueur.pointsDeVie > 0;
// }

// // Fonction pour afficher l'état des joueurs
// function afficherEtatDesJoueurs() {
//     console.log("--------------------");
//     console.log(`${joueur1.nom}: ${joueur1.pointsDeVie} health_point`);
//     console.log(`${joueur2.nom}: ${joueur2.pointsDeVie} health_point`);
//     console.log("--------------------");
// }

// // Boucle principale du jeu
// while (estEnVie(joueur1) && estEnVie(joueur2)) {
//     // Tour du joueur 1
//     attaquer(joueur1, joueur2)
//     // attaquer(joueur1, joueur2);
//     if (!estEnVie(joueur2)) {
//       break; // Si le joueur 2 est mort, sortir de la boucle
//     }

//     // Tour du joueur 2
//     attaquer(joueur2, joueur1);
//   }

//   // Afficher le résultat du jeu
//   if (estEnVie(joueur1)) {
//     console.log(`${joueur1.nom} a gagné !`);
//   } else if (estEnVie(joueur2)) {
//     console.log(`${joueur2.nom} a gagné !`);
//   } else {
//     console.log("Match nul !");
//   }
const busTeamOne = document.querySelector('#busTeamOne');
const busTeamTwo = document.querySelector('#busTeamTwo');

fetch("http://localhost:3000/battlesettings")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let teamOne;
        let teamTwo;

        let divTeamOne;
        let divTeamTwo;
        
        if (data[0][0] && data[1]) {
            busTeamOne.src = `../../images/sprites/bus/${data[0][0].color}.png`
            teamOne = data[1]
            divTeamOne = document.createElement('div')
            divTeamOne.classList.add('teamOne')
            
        }
        if (data[0][1] && data[2]) {
            busTeamTwo.src = `../../images/sprites/bus/${data[0][1].color}.png`
            teamTwo = data[2]
            divTeamTwo = document.createElement('div')
            divTeamTwo.classList.add('teamTwo')
        }

        console.log(teamOne);
        console.log(teamTwo);

        const allFighters = teamOne.concat(teamTwo);
        const idRound = document.querySelector('.idRound')


        let increment = 0;
        teamOne.forEach(elements => {
            console.log(elements);
            increment++;
            const divGrid = document.createElement('div');

            const skin = elements.skin
            const skinFirstLetter = skin.charAt(0).toUpperCase()

            divGrid.classList.add('grid', `grid${increment}`)

            const divLifebar = document.createElement('div');
            divLifebar.classList.add('lifebar');

            const divGreenbar = document.createElement('div');
            divGreenbar.classList.add('greenbar');

            const nameFighter = document.createElement('p')
            nameFighter.setAttribute('class', 'nameFighter');

            const health_pointNumber = document.createElement('p');
            health_pointNumber.setAttribute('class', 'numberhealth_point')

            const divSkin = document.createElement('div');
            divSkin.classList.add('imgCharacter')
            divSkin.style.backgroundImage = `url('/images/sprites/battle/${skinFirstLetter + skin.slice(1)}.png`;

            nameFighter.innerHTML = elements.character_name


            divGreenbar.append(health_pointNumber)
            divLifebar.appendChild(divGreenbar)
            divGrid.append(nameFighter, divLifebar, divSkin)
            divTeamOne.append(divGrid)
            getFighters.appendChild(divTeamOne)

        })
        teamTwo.forEach(elements => {
            console.log(elements);
            increment++;
            const divGrid = document.createElement('div');

            const skin = elements.skin
            const skinFirstLetter = skin.charAt(0).toUpperCase()

            divGrid.classList.add('grid', `grid${increment}`)

            const divLifebar = document.createElement('div');
            divLifebar.classList.add('lifebar');

            const divGreenbar = document.createElement('div');
            divGreenbar.classList.add('greenbar');

            const nameFighter = document.createElement('p')
            nameFighter.setAttribute('class', 'nameFighter');

            const health_pointNumber = document.createElement('p');
            health_pointNumber.setAttribute('class', 'numberhealth_point')

            const divSkin = document.createElement('div');
            divSkin.classList.add('imgCharacter')
            divSkin.style.backgroundImage = `url('/images/sprites/battle/${skinFirstLetter + skin.slice(1)}.png`;

            nameFighter.innerHTML = elements.character_name


            divGreenbar.append(health_pointNumber)
            divLifebar.appendChild(divGreenbar)
            divGrid.append(nameFighter, divLifebar, divSkin)
            divTeamTwo.append(divGrid)
            getFighters.appendChild(divTeamTwo)

        })

        busContainer.appendChild(getFighters)

        const pointVie = document.querySelectorAll('.numberhealth_point');
        const greenBar = document.querySelectorAll('.greenbar');
        const infosFight = document.querySelector('.infoFight')
        const img = document.querySelectorAll('.imgCharacter');
        let number = genererNombreAleatoire(0, 100);

        // function for generate a random number
        function genererNombreAleatoire(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let pvMax = []
        for (let figther of allFighters) {
            pvMax.push(figther.health_point)
        }
        console.log(pvMax)


        // function attack
        const status = document.querySelector('.infosRound')
        function attack(attaquant, defenseur, random1, random2) {

            const damage = attaquant[random1].attack;
            let randomAll = genererNombreAleatoire(0, allFighters.length - 1)
            defenseur[random2].health_point -= damage;
            status.innerHTML += `${attaquant[random1].character_name} attaque ${defenseur[random2].character_name} et lui inflige ${damage} damage <br>`;

            for (let i = 0; i < pointVie.length && i < allFighters.length && i < img.length && i < greenBar.length; i++) {

                pointVie[i].innerHTML = Math.floor(allFighters[i].health_point);

                greenBar[i].style.width = (100 / pvMax[i]) * allFighters[i].health_point + '%';



                if (allFighters[i].health_point <= 0) {
                    allFighters[i].health_point = 0;
                    img[i].style.backgroundPositionX = '50%';
                }
                else if (allFighters[i] == attaquant[random1] && allFighters[i].health_point > 0) {
                    img[i].style.backgroundPositionX = '75%';
                }
                else if (allFighters[i] == defenseur[random2] && allFighters[i].health_point < allFighters[randomAll].health_point) {
                    img[i].style.backgroundPositionX = '25%'
                }
                else if (allFighters[i] != allFighters[randomAll]) {
                    img[i].style.backgroundPositionX = '0%'
                }
            }
        }

        const restartDiv = document.querySelector('.restartBtn')
        // turn based combat
        let i = 0;
        let intervalId = null;
        function fight() {
            let randomIndexOne = genererNombreAleatoire(0, teamOne.length - 1);
            let randomIndexTwo = genererNombreAleatoire(0, teamTwo.length - 1);


            if (inLive(teamOne, randomIndexOne) && inLive(teamTwo, randomIndexTwo)) {
                infosFight.scrollTo(0, infosFight.scrollHeight)
                number++;
                i++;
                idRound.innerHTML += `Round ${i} <br>`;

                if (number % 2) {
                    attack(teamOne, teamTwo, randomIndexOne, randomIndexTwo)
                }
                else {
                    attack(teamTwo, teamOne, randomIndexTwo, randomIndexOne)
                }
            }

            function checkWinner(teamOne, teamTwo) {
                const sumHealthPointsTeamOne = teamOne.reduce((sum, character) => sum + Math.floor(character.health_point), 0);
                const sumHealthPointsTeamTwo = teamTwo.reduce((sum, character) => sum + Math.floor(character.health_point), 0);
              
                if (sumHealthPointsTeamOne <= 0 && sumHealthPointsTeamTwo <= 0) {
                  status.innerHTML += "Match nul";
                  clearInterval(intervalId)
                } else if (sumHealthPointsTeamOne <= 0) {
                  status.innerHTML += "Équipe 2 gagne";
                  clearInterval(intervalId)
                } else if (sumHealthPointsTeamTwo <= 0) {
                  status.innerHTML += "Équipe 1 gagne";
                  clearInterval(intervalId)
                }
              }
              
              // Appeler la fonction checkWinner avec vos équipes comme arguments
              checkWinner(teamOne, teamTwo);

}
        intervalId = setInterval(fight, 50)



        // function to verify if fighter is in live
        function inLive(joueur, random) {
            return joueur[random].health_point > 0
        }

    })