import express from 'express';
import {createCharacter, createVehicle,
        getCharacters, getVehicles,
        choice, battleSettings,
        newBattle, saveResult, levelUp,
        cleanChoice, getRanking, getHistoric } from './database.js';

const app = express();

app.use(express.json());

//CODE FOR CORS ERRORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//*--------FOR PAGE 1 (create characters)--------*\\
//Insert a new character
app.post("/character/create", async (req, res) => {
  const {character_name, skin, class_id} = req.body;
  await createCharacter(character_name, skin, class_id);
  res.status(201).send("Character created !");
});
//Insert a new vehicles
app.post("/vehicle/create", async (req, res) => {
  const {vehicle_name, color, buff, health} = req.body;
  await createVehicle(vehicle_name, color, buff, health);
  res.status(201).send("Vehicle created !");
});

//*--------FOR PAGE 2 (config crew)--------*\\
//Get the list of characters
app.get("/characters", async (req, res) => {
    const characters = await getCharacters();
    res.send(characters);
  });
//Get the list of vehicles
app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.send(vehicles);
});
//Character(s) and vehicle(s) choice
app.post("/choice", async (req, res) => {
  const dataChoice = req.body;
  await cleanChoice();
  await choice(dataChoice.liste1);
  await choice(dataChoice.liste2);
  res.status(200).send("Choice is updated !");
});

//*--------FOR PAGE 3 (battle)--------*\\
//Send stats for the battle
app.get("/battlesettings", async (req, res) => {
  const settings = await battleSettings();
  res.send(settings);
});
//Retrieve end of battle information
app.post("/battlefinish", async (req, res) => {
  const { fighters, winners } = req.body;
  await newBattle();
  await saveResult(fighters);
  await levelUp(winners);
  res.status(201).send("Results saved !")
});

//*--------FOR PAGE 4 (historic)--------*\\
//Retrieve character rankings
app.get("/historic", async (req, res) => {
  const ranking = await getRanking();
  const historic = await getHistoric();
  res.send([ranking, historic]);
});



app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 5000');
  });