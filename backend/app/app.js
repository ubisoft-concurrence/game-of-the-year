import express from 'express';
import { getCharacters } from './database.js';

const app = express();

//CODE FOR CORS ERRORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use("/characters", async (req, res) => {
    const characters = await getCharacters();
    res.status(200).json(characters);
  });

app.listen(5000, () => {
    console.log('Le serveur est en écoute sur le port 5000');
  });""