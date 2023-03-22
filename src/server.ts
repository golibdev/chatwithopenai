import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config";
import { config } from './config/config';
import { connectDB } from './config/db';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({ message: err.message });
})

connectDB();
app.listen(config.PORT, () => {
   console.log(`Server running on port: ${config.PORT}`);
})