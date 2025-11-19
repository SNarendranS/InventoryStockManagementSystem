import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/greet', (req, res) =>
    res.send("welcome to the inventory stock management")
)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
