import { getToken } from "../utils/token.js";
import UserModel from "../models/user.model.js"


const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days
};

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        let user = await UserModel.findOne({ email })

        if (!user) {
            user = await UserModel.create({ name, email })
        }

        const token = getToken(user._id.toString())
        res.cookie("token", token, COOKIE_OPTIONS)

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits  // credits add 
            }
        })

    } catch (error) {
        console.error("GoogleAuth Error : ", error.message)
        return res.status(500).json({ message: "Google singUp error" })
    }
}

export const logOutUser = async (req, res) => {
    try {
        res.clearCookie("token", COOKIE_OPTIONS);
        return res.status(200).json({ success: ture, message: "logout succesfull " })
    } catch (error) {
        console.log("logOut Error ", error.message)
    }
    res.status(500).json({ message: "Error in logout controler" })
}  