import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/greet', (req, res) =>
    res.send("welcome to the inventory stock management")
)
const start = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
start()
