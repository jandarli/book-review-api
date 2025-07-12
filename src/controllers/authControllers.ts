import { Request, Response } from 'express';
import { z } from 'zod';
import pool from '../../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerBodyParamsSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string()
        .min(8, { message: `Password must be at least 8 characters long` })
        .regex(/[A-Z]/, { message: `Password must contain at least one uppercase letter` })
        .regex(/[a-z]/, { message: `Password must contain at least one lowercase letter` })
        .regex(/[0-9]/, { message: `Password must contain at least one number` })
        .regex(/[^A-Za-z0-9]/, { message: `Password must contain at least one special character` })
});

export const register = async (req: Request, res: Response) => {
    try {
        const validatedBodyParams = registerBodyParamsSchema.parse(req.body);
        const { email, username, password } = validatedBodyParams;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await pool.query('CALL insert_user($1, $2, $3)', [username, email, hashedPassword]);
        res.status(201).json({ message: 'User created successfully' });
        return;
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            console.error("Zod Validation Error:", err.stack);
            res.status(400).json({
                message: "Validation failed for query parameters.",
                errors: err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
            });
            return;
        }

        console.error(`Error executing stored procedure insert_user`, err.stack);
        res.status(500).json({ error: `Error adding user.` })
        return;
    }
}

const loginBodyParamsSchema = z.object({
    email: z.email().optional(),
    username: z.string().optional(),
    password: z.string()
}).refine(data => data.email || data.username, {
    message: "Either email or username must be provided.",
    path: ['email', 'username'],
});


export const login = async (req: Request, res: Response) => {
    try {
        const validatedBodyParams = loginBodyParamsSchema.parse(req.body);
        const { username, password } = validatedBodyParams;

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
                res.status(200).json({ "token": token })
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
        if (err instanceof z.ZodError) {
            console.error("Zod Validation Error:", err.stack);
            res.status(400).json({
                message: "Validation failed for query parameters.",
                errors: err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
            });
            return;
        }

        console.error(`Error executing function get_user`, err.stack);
        res.status(500).json({ error: `Invalid credentials` });
        return;
    }

}