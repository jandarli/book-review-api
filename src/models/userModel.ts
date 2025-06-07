import pool from "../../config/database";

interface User {
    id: number;
    email: string; 
    username: string;
    password: string; 
}


export const createUser = async (username: string, email: string,  hashedPassword: string): Promise<void> => {
    await pool.query('CALL insert_user($1, $2, $3)', [username, email, hashedPassword]);
};


export const getUser = async (username: string ): Promise< User | null > => {
    const result = await pool.query('SELECT * FROM get_user($1)', [username]);

    return result.rows[0] || null; 
};

