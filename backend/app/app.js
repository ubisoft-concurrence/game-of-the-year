import express from 'express';
import { getCharacters, getVehicles } from './database.js';

const app = express();

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
  const characters = req.body;
  await choice(characters);
  res.status(200).send("Choice is updated !");
});

//*--------FOR PAGE 3 (battle)--------*\\
app.get("/battlesettings", async (req, res) => {
  const settings = await battleSettings();
  res.send(settings);
})

app.listen(5000, () => {
    console.log('Le serveur est en écoute sur le port 5000');
  });