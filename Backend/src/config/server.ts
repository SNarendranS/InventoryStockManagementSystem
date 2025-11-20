import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());               
app.use(cors());                
app.use(express.json());         
app.use(express.urlencoded({ extended: true })); 
app.use(limiter);  

const baseURI:string='/api'
app.use(`${baseURI}/auth`, authRoutes);
app.use(`${baseURI}/users`, userRoutes);

export default app