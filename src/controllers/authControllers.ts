import { Request, Response } from 'express';
import pool from '../../config/database';


export const register = async (req: Request, response: Response) => {
    const { email, username, password } = req.body; 

}


export const login = async (req: Request, response: Response) => {
    const { email, password } = req.body;

}