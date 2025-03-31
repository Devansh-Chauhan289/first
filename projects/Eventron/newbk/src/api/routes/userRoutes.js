import express from "express"
import { deleteUser, getUserProfile, loginUser, refreshAccessToken, registerUser, updateUser } from "../controllers/userController.js"
import passport from "passport"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const userRouter = express.Router()

// Register and Login Routes*
userRouter.post("/user/register", registerUser)
userRouter.post("/user/login", loginUser)
userRouter.post("/user/refresh-token", refreshAccessToken)
userRouter.get("/user/profile/:email", authMiddleware, getUserProfile)
userRouter.put("/user/update", authMiddleware, updateUser)
userRouter.delete("/user/delete", authMiddleware, deleteUser)


export {
    userRouter
}