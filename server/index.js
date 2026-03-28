import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import mongoose, { connect } from "mongoose"
import connectDB from "./config/db"


dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// MongoDb conection 
connectDB()

// Routes
app.get("/", (req, res) => {
    return res.json({ message: "server Started" })
})

const PORT = process.env.PORT || 5000

// Server Start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

