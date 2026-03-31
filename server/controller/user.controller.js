import UserModel from "../models/user.model.js"


export const getCurrentUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const user = await UserModel.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(user)

    } catch (error) {
        console.log("GetCurrentUser Error", error.message)
        res.status(500).json({ message: "GetCurrent user Error" })
    }
}