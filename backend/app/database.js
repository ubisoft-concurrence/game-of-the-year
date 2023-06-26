import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'game',
}).promise()

//Récupèrer la liste des personnages
export async function getCharacters() {
    const result = await pool.query("SELECT * FROM characters");
    return result[0];
  }

//Récupèrer 1 personnage selon son id (URL sensible à la casse)
export async function getCharacter(id) {
    const result = await pool.query(
        `SELECT * FROM characters WHERE character_id = ?`, [id])
    return result[0];
  }