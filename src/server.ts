import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { config } from './config/config';
import { connectDB } from './config/db';

import routeV1 from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routeV1);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({ message: err.message });
})

connectDB();
app.listen(config.PORT, () => {
   console.log(`Server running on port: ${config.PORT}`);
})