import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'game',
}).promise()

//*--------FOR PAGE 1 (create characters)--------*\\
//Insert a new character
export async function createCharacter(character_name, skin, class_id) {
    const result = await pool.query(`
        INSERT INTO characters (character_name, skin, class_id)
        VALUES (?, ?, ?)
        `, [character_name, skin, class_id]);
    return result;
}
//Insert a vehicle
export async function createVehicle(vehicule_name, color, buff, nerf) {
    await pool.query(`
        INSERT INTO vehicles (vehicle_name, color, buff, nerf)
        VALUES (?, ?, ?, ?)
        `, [vehicule_name, color, buff, nerf]);
}

//*--------FOR PAGE 2 (config crew)--------*\\
//Get the list of characters
export async function getCharacters() {
    const result = await pool.query(`
        SELECT character_name, class_name, character_level 
        FROM characters JOIN classes ON classes.class_id = characters.class_id
        `);
    return result[0];
}
//Get the list of vehicles
export async function getVehicles() {
    const vehicles = await pool.query(`
        SELECT * FROM vehicles
        `);
    return vehicles[0];
}
//Character(s) and vehicle(s) choice
export async function choice(gang) {
    let vehicleId = await pool.query(`
            SELECT vehicle_id FROM vehicles WHERE vehicle_name = ?
            `, gang[0]);
    
    vehicleId = vehicleId[0].map(result => result.vehicle_id);
    for (let i = 1; i < gang.length; i++) {
        await pool.query(`
            UPDATE characters SET vehicle_id = ? WHERE character_name = ?
            `, [vehicleId, gang[i]]);
    }
}
// await cleanChoice();
// await choice(['PorteGuerre', 'ZePO'])
// await choice(['MagicBus', 'Commit', 'Zescrum', 'fetch', 'Merge'])

//*--------FOR PAGE 3 (battle)--------*\\
//Configure fighters stats function
function configure(fighters) {
    for (let character of fighters) {
        if (character.buff == "health") {
            character.health_point += character.health_point * 0.2;
        } else if (character.buff == "attack") {
            character.attack += character.attack * 0.2;
        }

        character.health_point += character.health_point * 0.1 * character.character_level;
        character.attack += character.attack * 0.1 * character.character_level;
    }
}
//Collect and configure useful stats for the battle
export async function battleSettings() {
    let vehicle = await pool.query (`
        SELECT DISTINCT characters.vehicle_id, color 
        FROM characters 
        JOIN vehicles ON characters.vehicle_id = vehicles.vehicle_id
        WHERE characters.vehicle_id IS NOT NULL
        `);
    let vehicleId = vehicle[0].map(
                        result => result.vehicle_id
                        );
    let gang1 = await pool.query(`
        SELECT
            characters.character_name,
            characters.skin,
            characters.character_level,
            classes.health_point,
            classes.attack,
            characters.vehicle_id,
            vehicles.color,
            vehicles.buff,
            vehicles.nerf
        FROM 
            characters
        JOIN
            classes
        ON
            characters.class_id = classes.class_id
        JOIN
            vehicles
        ON
            characters.vehicle_id = vehicles.vehicle_id
        WHERE
            characters.vehicle_id = ?
        `, vehicleId[0]);
    let gang2 = await pool.query(`
        SELECT
            characters.character_name,
            characters.skin,
            classes.health_point,
            classes.attack,
            characters.character_level,
            characters.vehicle_id,
            vehicles.color,
            vehicles.buff,
            vehicles.nerf
        FROM 
            characters
        JOIN
            classes
        ON
            characters.class_id = classes.class_id
        JOIN
            vehicles
        ON
            characters.vehicle_id = vehicles.vehicle_id
        WHERE
            characters.vehicle_id = ?
        `, vehicleId[1]);
    configure(gang1[0]);
    configure(gang2[0]);
    gang1[0] = gang1[0].map(({ character_name, skin, health_point, attack }) => ({
        character_name,
        skin,
        health_point,
        attack
      }));
    gang2[0] = gang2[0].map(({ character_name, skin, health_point, attack }) => ({
        character_name,
        skin,
        health_point,
        attack
      }));
    return [vehicle[0], gang1[0], gang2[0]];
}
// battleSettings()
//Save a battle
export async function newBattle() {
    await pool.query(`
        INSERT INTO battles (date)
        VALUES (CURDATE())
        `)
}
//Get character id by name (for saveResult())
export async function getCharacterId(name) {
    const [rows] = await pool.query(`
        SELECT character_id FROM characters WHERE character_name = ?
        `, [name]
    );
    return rows[0].character_id;
}
//Save the results of a batlle
export async function saveResult(fighters) {
    const lastBattleId = await pool.query(`
        SELECT battle_id
        FROM battles
        ORDER BY battle_id DESC
        LIMIT 1
        `)

    for (let character of fighters) {
        console.log(character.character_name)
        await pool.query(`
        INSERT INTO battles_characters (battle_id, character_id, result)
        VALUES  (?, ?, ? )
        `, [lastBattleId, getCharacterId(character.character_name), character.result])
    }
}
//Update character level of the winners 
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
//Clean choice of vehicles
export async function cleanChoice() {
    await pool.query(`
        UPDATE characters 
        SET vehicle_id = NULL 
        WHERE vehicle_id IS NOT NULL 
    `);
}

//*--------FOR PAGE 4 (historic)--------*\\
//Retrieve character rankings
export async function getRanking() {
    const ranking = await pool.query(`
        SELECT character_name, character_level 
        FROM characters ORDER BY character_level DESC
    `);
    return ranking[0];
}

//Retrieve battle history
export async function getHistoric() {
    const hisotric = await pool.query(`
        SELECT battles.battle_id, character_name, result 
        FROM characters 
        JOIN battles_characters 
        ON (characters.character_id = battles_characters.character_id) 
        JOIN battles 
        ON (battles.battle_id = battles_characters.battle_id)
    `);
    return historic[0];
}

