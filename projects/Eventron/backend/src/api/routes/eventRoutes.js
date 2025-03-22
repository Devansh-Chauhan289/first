import express from "express"
import { createEventInDatabase, deleteEvent, getAllEvents, getEvent, getRSVPs, mediacontroller, updateEventInDatabase, updateRSVP } from "../controllers/eventController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import multer from "multer"
import { upload } from "../middlewares/multer.js"


const eventRouter = express.Router()

eventRouter.post("/create", authMiddleware, upload.single("media"), createEventInDatabase)
eventRouter.get("/", getAllEvents)
eventRouter.get("/:id", getEvent)
eventRouter.put("/update-event/:id", authMiddleware, upload.array("media"), updateEventInDatabase)
eventRouter.delete("/delete/:id", authMiddleware, deleteEvent)
eventRouter.post("/rsvp", authMiddleware, updateRSVP)
eventRouter.get("/:eventId/rsvps", authMiddleware, getRSVPs)

export {
    eventRouter
}
