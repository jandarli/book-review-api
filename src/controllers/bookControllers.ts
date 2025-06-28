import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from "../../config/database";

// For fetching all books using function
export const getBooks = async (req: Request, res: Response) => {

    try {
        const result = await pool.query('SELECT * FROM get_books()');
        res.status(200).json(result.rows);
    } catch (err: any) {
        console.error(`Error executing function get_books`, err.stack);
        res.status(500).send(`Error executing function`);
    }
}

// For fetching book by title, author, year 
export const getBook = async (req: Request, res: Response) => {
    const {title, author, year} = req.query;
    console.log(req.query);
    try {
        const result = await pool.query('SELECT * FROM get_book($1, $2, $3)', [title, author, year]);
        
        if (result && result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ error: `Book not found, attributes: ${title}, ${author}, ${year}`});
        }

    } catch (err: any) {
        console.error(`Error executing function get_book`, err.stack);
        res.status(500).json({error: `Error retrieving book with attributes title: ${title}, author: ${author}, year: ${year}. Please check the server logs for details.`});
    }
}

// For inserting books using stored procedure
export const insertBooks = async (req: AuthRequest, res: Response) => {
    const { title, author, year } = req.body;

    try {
        const result = await pool.query('CALL insert_book($1, $2, $3)', [author, title, year]);
        
        res.status(201).json({
            message: "Book added successfully"
        });
    } catch (err: any) {
        console.error(`Error executing stored procedure insertBooks`, err.stack);
        res.status(500).json({error: `Error adding book with attributes title: ${title}, author: ${author}, year: ${year}. Please check the server logs for details.`});
    }
}
