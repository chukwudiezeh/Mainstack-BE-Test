import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responses';
import jwt from 'jsonwebtoken';
import AuthService from '../services/AuthService';

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let authorization = req.headers.authorization;
    if (!authorization) return errorResponse(res, 401, "Unauthorized! Token not provided");

    const token = authorization.split(" ")[1];

    try {
        const invalidToken = await AuthService.findInvalidToken(token);
        if (invalidToken != null) return errorResponse(res, 401, "Unauthorized! Invalid token");

        jwt.verify(token, process.env.JWT_SECRET as string, (err, decodedData) => {
            if (err && err.name === 'TokenExpiredError') return errorResponse(res, 401, "Unauthorized! Token expired");

            req.user = decodedData;
            return next();
        });
    } catch (error) {
        throw error;
    }
}

export default authenticate;