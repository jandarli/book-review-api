import { Request, Response, NextFunction } from "express";
import * as books from './data/books.json'

const express = require('express');
const app = express(); 

const PORT = 4001;

app.get('/books', (req: Request, res: Response, next: NextFunction) => {
    res.json(books);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})


