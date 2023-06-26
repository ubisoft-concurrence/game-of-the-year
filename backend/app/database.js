import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'game',
}).promise()

//Récupèrer la liste des personnages (nom, classe, level)
export async function getCharacters() {
    const result = await pool.query(
        `SELECT character_name, class_name, character_level 
         FROM characters JOIN classes ON classes.class_id = characters.class_id;`)
    return result[0];
  }

//Récupèrer 1 personnage selon son id (URL sensible à la casse)
export async function getCharacter(id) {
    const result = await pool.query(
        `SELECT * FROM characters WHERE character_id = ?`, [id])
    return result[0];
}

//Insère 1 personnage
export async function createCharacter(character_name, skin) {
    const result = await pool.query(`
    INSERT INTO characters (character_name, skin)
    VALUES (?, ?)`, [character_name, skin])
    return result
}

//Insère 1 vehicule
export async function createVehicule(vehicule_name, buff, nerf) {
    await pool.query(`
    INSERT INTO vehicles (vehicle_name, buff, nerf)
    VALUES (?, ?, ?)`, [vehicule_name, buff, nerf])
}

