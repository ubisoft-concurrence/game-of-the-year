import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'game',
}).promise()

//Récupérer la liste des personnages (nom, classe, level)
export async function getCharacters() {
    const result = await pool.query(`
        SELECT character_name, class_name, character_level 
        FROM characters JOIN classes ON classes.class_id = characters.class_id
        `)
    return result[0];
  }

//Récupérer 1 personnage selon son id (URL sensible à la casse)
export async function getCharacter(id) {
    const result = await pool.query(`
    SELECT * FROM characters WHERE character_id = ?
    `, [id])
    return result[0];
}

//Insère 1 personnage
export async function createCharacter(character_name, skin, class_id) {
    const result = await pool.query(`
    INSERT INTO characters (character_name, skin, class_id)
    VALUES (?, ?)
    `, [character_name, skin, class_id])
    return result
}

//Insère 1 vehicule
export async function createVehicule(vehicule_name, buff, nerf) {
    await pool.query(`
    INSERT INTO vehicles (vehicle_name, buff, nerf)
    VALUES (?, ?, ?)
    `, [vehicule_name, buff, nerf])
}

//Récupérer la liste des vehicules
export async function getVehicles() {
    const vehicles = await pool.query(`
    SELECT * FROM vehicles
    `)
    return vehicles[0];
}

//Récupérer le classement
export async function getRanking() {
    const ranking = await pool.query(`
        SELECT character_name, character_level 
        FROM characters ORDER BY character_level DESC
    `)
}

//Récupérer l'historique des batailles
export async function getHistoric(){
    const hisotric = await pool.query(`
        SELECT battles.battle_id, character_name, result 
        FROM characters 
        JOIN battles_characters 
        ON (characters.character_id = battles_characters.character_id) 
        JOIN battles 
        ON (battles.battle_id = battles_characters.battle_id)
    `)
}

//Monter de level (winners liste d'objets JS contenant character_name et character_level)
export async function levelUp(winners) {
    for (let character of winners) {
        await pool.query(`
            UPDATE characters 
            SET character_level = ? 
            WHERE character_name = ?
            `, [character.character_level, character.character_name]
        )
    }
}

