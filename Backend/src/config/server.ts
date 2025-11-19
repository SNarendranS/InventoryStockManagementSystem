import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

export default app