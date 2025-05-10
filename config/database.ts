import { Pool } from 'pg'; 
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST, 
    port: parseInt(process.env.PG_PORT as string, 10) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

pool.connect()
    .then(async () => {
        console.log('Connected to the database');
        //await loadPGSQLFiles();  // Load stored procedures on server start
    })
    .catch((err: Error) => console.error('Connection error', err.stack));

    /*
const loadPGSQLFiles = async () => {
    const sqlDir = path.join(__dirname, '../sql');  // Fix path to point to ./sql (relative to the config directory)
    const files = fs.readdirSync(sqlDir);

    for (const file of files) {
        if (file.endsWith('.pgsql')) {
            const filePath = path.join(sqlDir, file);
            const sql = fs.readFileSync(filePath, 'utf-8');
            try {
                await pool.query(sql);
            } catch (err) {
                console.error(`Error loading stored procedure from ${file}:`, err);
            }
        }
    }
}; */

export default pool;
