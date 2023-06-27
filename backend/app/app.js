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

app.get("/characters", async (req, res) => {
    const characters = await getCharacters();
    res.send(characters);
  });

app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.send(vehicles);
});

app.listen(5000, () => {
    console.log('Le serveur est en écoute sur le port 5000');
  });