import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; username: string; role: string };
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
        const decoded = jwt.verify(token, secret) as { id: number; username: string; role: string };
        req.user = decoded;
        console.log(req.user);
        next();

    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }

}


export const authorizeRoles = (...roles: string[] ) => {
    return (req: AuthRequest, res: Response, next: NextFunction ) => {
        if (!req.user || !req.user.role) {
            console.error('User or user role not found on request after authentication.');
            res.status(403).json({ error: 'Access Denied: User role not found' });
            return;
        }

         if (roles.includes(req.user.role)) {
            next();
            return;

        } else {
            console.warn(`Access Denied for user ${req.user.username} with role ${req.user.role}. Required roles: ${roles.join(', ')}`);
            res.status(403).json({ error: 'Access Denied: Insufficient permissions' });
            return;
        }
    }
}
