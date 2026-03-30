import express from "express"
import { googleAuth, logOutUser } from "../controller/auth.controller.js"


const authRouter = express.Router()

authRouter.post("/google ",googleAuth)
authRouter.post("/logout", logOutUser )

export default authRouter