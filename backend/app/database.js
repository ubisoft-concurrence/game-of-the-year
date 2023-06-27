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
        `);
    return result[0];
  }

//Récupère l'id du personnage selon son nom
export async function getCharacterId(name) {
    const [rows] = await pool.query(`
        SELECT character_id FROM characters WHERE character_name = ?
        `, [name]
    );
    return rows[0].character_id;
}

//Insère 1 personnage
export async function createCharacter(character_name, skin, class_id) {
    const result = await pool.query(`
    INSERT INTO characters (character_name, skin, class_id)
    VALUES (?, ?)
    `, [character_name, skin, class_id]);
    return result;
}

//Insère 1 vehicule
export async function createVehicle(vehicule_name, color, buff, nerf) {
    await pool.query(`
    INSERT INTO vehicles (vehicle_name, color, buff, nerf)
    VALUES (?, ?, ?)
    `, [vehicule_name, color, buff, nerf]);
}

//Récupérer la liste des vehicules
export async function getVehicles() {
    const vehicles = await pool.query(`
    SELECT * FROM vehicles
    `);
    return vehicles[0];
}

//Récupérer le classement
export async function getRanking() {
    const ranking = await pool.query(`
        SELECT character_name, character_level 
        FROM characters ORDER BY character_level DESC
    `);
}

//Enregistre une bataille
export async function newBattle() {
    await pool.query(`
        INSERT INTO battles (date)
        VALUES (CURDATE())
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
    `);
}

//Monter de level (winners liste d'objets JS contenant character_name et character_level)
export async function levelUp(winners) {
    for (let character of winners) {
        await pool.query(`
            UPDATE characters 
            SET character_level = ? 
            WHERE character_name = ?
            `, [character.character_level, character.character_name]
        );
    }
}

//Choix du vehicule
export async function vehicleChoice(characters) {
    for (let character of characters) {
        let vehicleIdQueryResult = await pool.query(`
            SELECT vehicle_id FROM vehicles WHERE vehicle_name = ?
            `, character.vehicle_name);
        
        let vehicleId = vehicleIdQueryResult[0].map(result => result.vehicle_id);
        
        await pool.query(`
        UPDATE characters SET vehicle_id = ? WHERE character_name = ?
        `, [vehicleId, character.character_name]);
    }
}

//Nettoyer le choix de vehicule
export async function clearChoice() {
    await pool.query(`
        UPDATE characters 
        SET vehicle_id = NULL 
        WHERE vehicle_id IS NOT NULL 
    `);
}

//Récupérer les paramètres utiles au combat
//Caracteristique pour le combat
export async function battleSetting() {
    const vehicles = await pool.query (`
        SELECT DISTINCT vehicle_id 
        FROM characters 
        WHERE vehicle_id IS NOT NULL
        `);
    const effect = await pool.query (`
        SELECT vehicle_id, buff, nerf
        WHERE vehicle_id = ?
        `);
    const fighters = await pool.query(`
        SELECT character_name, skin, health_point, attack, vehicle_id 
        FROM characters
        JOIN classes ON classes.class_id = characters.class_id
        WHERE vehicle_id IS NOT NULL 
        ORDER BY vehicle_id ASC;
        `);

    const classSettings = await pool.query(``);
}