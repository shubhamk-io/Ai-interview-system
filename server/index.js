import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "server Started" });
});

app.use("/api/auth/",authRouter)

const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});