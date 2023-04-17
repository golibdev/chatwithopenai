import { Request } from 'express';

export interface JwtPayload {
   userId: string
}

export interface CustomRequest extends Request {
   user: any;
}