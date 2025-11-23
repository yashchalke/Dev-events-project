const express = require("express");
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const { 
    RegisterForEventController, 
    CheckRegistrationStatusController,
    GetUserRegistrationsController,
    GetTicketByIdController,
    VerifyTicketController
} = require("../Controllers/RegistrationController");

// Middleware to ensure user is logged in via Clerk
// This adds `req.auth.userId` to the request object
const requireAuth = ClerkExpressRequireAuth();

// POST: Register for an event (Protected)
router.post("/register", requireAuth, RegisterForEventController);

// GET: Check if specific user is registered for specific event (Protected)
router.get("/status/:eventId", requireAuth, CheckRegistrationStatusController);

// GET: Get all events for the logged-in user (Protected)
router.get("/my-events", requireAuth, GetUserRegistrationsController);

router.get("/ticket/:id", requireAuth, GetTicketByIdController);

router.post("/verify", requireAuth, VerifyTicketController);

module.exports = router;