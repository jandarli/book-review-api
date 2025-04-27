import { Request, Response } from 'express';
import pool from "../config/database";

// For fetching books using stored procedure
export const getBooks = async (req: Request, res: Response) => {

    try {
        const result = await pool.query('SELECT * FROM get_books()');
        res.status(200).json(result.rows);
    } catch (err: any) {
        console.error("Error executing stored procedure", err.stack);
        res.status(500).send("Error executing stored procedure");
    }
}

export const insertBooks = async (req: Request, res: Response) => {
    const { title, author, year } = req.body;

    try {
        const result = await pool.query('CALL insert_book($1, $2, $3)', [author, title, year]);
        
        const added_rows = result.rows[0];
        res.status(201).json(added_rows);
    } catch (err: any) {
        console.error("Error executing stored procedure", err.stack);
        res.status(500).send("Error executing stored procedure");
    }
}
