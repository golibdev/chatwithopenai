import { Request } from 'express';

export interface JwtPayload {
   data: string
}

export interface CustomRequest extends Request {
   user: any;
}