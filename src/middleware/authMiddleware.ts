import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}


export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction ) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization token missing or malformed');
        res.status(401).json({ error: 'Authorization token missing or malformed' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as { id: number; username: string };
        req.user = decoded;
        next();

    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }

}
