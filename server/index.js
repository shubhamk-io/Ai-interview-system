import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
connectDB();

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "server Started" });
});



app.use("/api/auth/", authRouter)
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});