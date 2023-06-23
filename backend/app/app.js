import express from 'express';
import { getCharacters } from './database.js';

const app = express();

app.get("/characters", async (req, res) => {
    const characters = await getCharacters();
    res.send(characters)
})