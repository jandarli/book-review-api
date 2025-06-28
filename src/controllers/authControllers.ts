import { Request, Response } from 'express';
import pool from '../../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).json({ error: "Email, username, and password are required." });
        return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const result = await pool.query('CALL insert_user($1, $2, $3)', [username, email, hashedPassword]);
        res.status(201).json({ message: 'User created successfully' });
        return;
    } catch (err: any) {
        console.error(`Error executing stored procedure insert_user`, err.stack);
        res.status(500).json({ error: `Error adding user with attributes username: ${username}, email: ${email}` })
        return;
    }


}


export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "username and password are required." });
        return;
    }

    try {
        const result = await pool.query('SELECT * FROM get_user($1)', [username]);
        if (result && result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign(
                    { userId: user.id, username: user.username },
                    process.env.JWT_SECRET as string,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ "token" : token })
                return;
            } else {
                res.status(401).json({ error: `Invalid credentials` })
                return;
            }
        } else {
            res.status(404).json({ error: `Invalid credentials` });
            return;
        }


    } catch (err: any) {
        console.error(`Error executing function get_user`, err.stack);
        res.status(500).json({ error: `Invalid credentials` });
        return;
    }

}