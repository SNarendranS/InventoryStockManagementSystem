import app from "./config/server"
import dotenv from "dotenv";
import { connectDB } from "./config/database";

dotenv.config();

const port=process.env.PORT


const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};
start()