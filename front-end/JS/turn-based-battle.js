const getFighters = document.querySelector('#getFighters')
const busContainer = document.querySelector('.busContainer')
const busTeamOne = document.querySelector('#busTeamOne');
const busTeamTwo = document.querySelector('#busTeamTwo');

fetch("http://localhost:3000/battlesettings")
    .then(res => res.json())
    .then(data => {
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

        const allFighters = teamOne.concat(teamTwo);
        const idRound = document.querySelector('.idRound')

        let increment = 0;
        teamOne.forEach(elements => {

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

        // function attack
        const status = document.querySelector('.infosRound')
        function attack(attaquant, defenseur, random1, random2) {

            const damage = attaquant[random1].attack;
            let randomAll = genererNombreAleatoire(0, allFighters.length - 1)
            defenseur[random2].health_point -= damage;
            status.innerHTML += `<br>${attaquant[random1].character_name} attaque ${defenseur[random2].character_name} et lui inflige ${damage} damage <br>`;

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

        const restartDiv = document.querySelector('.restartDiv');
        const restartBtn = document.querySelector('.restartBtn');
        const fightStatus = document.querySelector('#fightStatus')
        restartBtn.addEventListener('click', () => {
            location.reload()
        })
        // turn based combat
        let i = 0;
        let intervalId = null;
        let timeOut = null;
        function fight() {
            let randomIndexOne = genererNombreAleatoire(0, teamOne.length - 1);
            let randomIndexTwo = genererNombreAleatoire(0, teamTwo.length - 1);


            if (inLive(teamOne, randomIndexOne) && inLive(teamTwo, randomIndexTwo)) {
                infosFight.scrollTo(0, infosFight.scrollHeight)
                number++;
                i++;
                idRound.innerHTML += `<br>Round ${i} <br>`;

                if (number % 2) {
                    attack(teamOne, teamTwo, randomIndexOne, randomIndexTwo)
                }
                else {
                    attack(teamTwo, teamOne, randomIndexTwo, randomIndexOne)
                }


                if (i === 1) {
                    fightStatus.src = '../../images/sprites/battle/fight.png'
                    console.log('oui');
                }
            }

            function checkWinner(teamOne, teamTwo) {
                const sumHealthPointsTeamOne = teamOne.reduce((sum, character) => sum + Math.floor(character.health_point), 0);
                const sumHealthPointsTeamTwo = teamTwo.reduce((sum, character) => sum + Math.floor(character.health_point), 0);

                if (sumHealthPointsTeamOne <= 0 && sumHealthPointsTeamTwo <= 0) {
                    status.innerHTML += "Match nul";
                    clearInterval(intervalId)
                    restartDiv.style.display = 'flex'
                } else if (sumHealthPointsTeamOne <= 0) {
                    status.innerHTML += `<br> Round ${i + 1} Équipe 2 gagne<br>`;
                    clearInterval(intervalId)
                    restartDiv.style.display = 'flex';
                    fightStatus.src = '../../images/sprites/battle/win.png'
                } else if (sumHealthPointsTeamTwo <= 0) {
                    status.innerHTML += `<br> Round ${i + 1} Équipe 1 gagne<br>`;
                    clearInterval(intervalId)
                    restartDiv.style.display = 'flex';
                    fightStatus.src = '../../images/sprites/battle/win.png'
                }
            }

            // Appeler la fonction checkWinner avec vos équipes comme arguments
            checkWinner(teamOne, teamTwo);

        }
        intervalId = setInterval(fight, 500)



        // function to verify if fighter is in live
        function inLive(joueur, random) {
            return joueur[random].health_point > 0
        }

    })