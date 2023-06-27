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

// RECUPERER LES PERSONNAGES (NOM, SKIN, LEVEL)
app.get("/characters", async (req, res) => {
    const characters = await getCharacters();
    res.send(characters);
  });

// ENREGISTRE UN PERSONNAGE DANS LA BDD
app.post("/character/create", async (req, res) => {
    const {character_name, skin} = req.body;
    await createCharacter(character_name, skin);
    res.status(201).send("Character created !");
  });

//RECUPERE LES VEHICULES (NOM, COULEUR, BUFF, DEBUFF)
app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.send(vehicles);
});

// ENREGISTRE UN VEHICULE DANS LA BDD
app.post("/vehicle/create", async (req, res) => {
  const {vehicle_name, color, buff, health} = req.body
  await createVehicle(vehicle_name, color, buff, health)
  res.status(201).send("Vehicle created !")
});

app.listen(5000, () => {
    console.log('Le serveur est en écoute sur le port 5000');
  });