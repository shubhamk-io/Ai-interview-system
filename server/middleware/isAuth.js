import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        // 🔥 DEBUG: check cookies aa rahi hai ya nahi
        console.log("Cookies:", req.cookies);

        const { token } = req.cookies;

        // 🔴 Check token exists
        if (!token) {
            console.log("❌ No token found");
            return res.status(401).json({ message: "Token not Found" });
        }

        // 🔴 Verify token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        // 🔴 Check payload
        if (!verifyToken.userId) {
            console.log("❌ Invalid token payload");
            return res.status(401).json({ message: "invalid Token" });
        }

        // ✅ Attach userId
        req.userId = verifyToken.userId;

        console.log("✅ Auth success, userId:", req.userId);

        next();

    } catch (error) {
        console.log("❌ Auth Error:", error.message); // 🔥 important
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default isAuth;