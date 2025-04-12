import { Request, Response } from 'express';
import * as books from '../data/books.json'; 

export const getBooks = (req: Request, res: Response) => {
    res.json(books);
}