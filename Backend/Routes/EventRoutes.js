const express = require("express");
const { CreateEventController, GetAllEventsController ,GetEventByIdController } = require("../Controllers/EventController");
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const router = express.Router();
const requireAuth = ClerkExpressRequireAuth();

router.post("/createevent", requireAuth ,CreateEventController);
router.get("/getevents",GetAllEventsController);
router.get("/:id", GetEventByIdController);

module.exports = router;