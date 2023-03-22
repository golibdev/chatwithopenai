import jwt from "jsonwebtoken";
import { User } from "../models";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
   data: string
}

export interface IGetUserAuthInfoRequest extends Request {
   user: any 
}

const tokenDecode = (req: IGetUserAuthInfoRequest) => {
   try {
      const bearer = req.headers['authorization'];

      if (bearer) {
         const token = bearer.split(" ")[1];

         return jwt.verify(token, process.env.TOKEN_SECRET as string);
      }

      return false;
   } catch { return false }
}

export const tokenAuth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
   const tokenDecoded = tokenDecode(req);

   if (!tokenDecoded) {
      return res.status(401).json({
         message: "Token invalid"
      })
   }

   const { data } = tokenDecoded as JwtPayload;
   const user = await User.findById(data);

   if (!user) return res.status(401).json({ message: "Token invalid" });

   req.user = user;

   next();
}