import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'game',
}).promise()


export async function getCharacters() {
    const result = await pool.query("SELECT * FROM characters")
    return result[0]
}
