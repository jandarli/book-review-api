import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../../config/database';

// For fetching all books using function
export const getBooks = async (req: Request, res: Response) => {

    try {
        const result = await pool.query('SELECT * FROM get_books()');
        res.status(200).json(result.rows);
    } catch (err: any) {
        console.error(`Error executing function get_books`, err.stack);
        res.status(500).send(`Error executing function`);
        return;
    }
}

const searchQueryParamsSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(), 
    year: z.string().transform(Number).pipe(z.number().int()).optional()

});

// For fetching book by title, author, year 
export const getBook = async (req: Request, res: Response) => {
    console.log(req.query);

    try {
        const validatedQueryParams = searchQueryParamsSchema.parse(req.query);
        const {title, author, year} = validatedQueryParams;

        const result = await pool.query('SELECT * FROM get_book($1, $2, $3)', [title, author, year]);
        
        if (result && result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ 
                error: `Book not found, attributes: ${title || 'N/A'}, ${author || 'N/A'}, ${year || 'N/A'}`
            });
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

        console.error(`Error executing function get_book`, err.stack);
        res.status(500).json({
            error: `Error retrieving book. Please check the server logs for details.`
        });
        return;
    }
}


const insertBodyParamsSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(), 
    year: z.string().transform(Number).pipe(z.number().int()).optional()

});

// For inserting books using stored procedure
export const insertBooks = async (req: AuthRequest, res: Response) => {
    try {
        const validatedQueryParams = insertBodyParamsSchema.parse(req.body);
        const {title, author, year} = validatedQueryParams;

        await pool.query('CALL insert_book($1, $2, $3)', [author, title, year]);
        
        res.status(201).json({
            message: "Book added successfully"
        });

    } catch (err: any) {
        if (err instanceof z.ZodError) {
            console.error("Zod Validation Error:", err.stack);
            res.status(400).json({
                message: "Validation failed for query parameters.",
                errors: err.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
            });
            return;
        }

        console.error(`Error executing stored procedure insertBooks`, err.stack);
        res.status(500).json({
            error: `Error adding book. Please check the server logs for details.`
        });
        return;
    }
}
