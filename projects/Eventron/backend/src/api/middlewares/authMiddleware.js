import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Auth Middleware: Token received:", token); // Log token

    if (!token) {
        console.error("Auth Middleware: No token provided."); // Log error
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Auth Middleware: Token verified successfully."); // Log success
        next();
    } catch (err) {
        console.error("Auth Middleware: Token verification failed:", err.message); // Log error
        res.status(401).json({ msg: "Token is not valid" });
    }
};

export { 
    authMiddleware 
}