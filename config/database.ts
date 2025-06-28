import { Pool } from 'pg'; 
import dotenv from 'dotenv';

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
    })
    .catch((err: Error) => console.error('Connection error', err.stack));

export default pool;
