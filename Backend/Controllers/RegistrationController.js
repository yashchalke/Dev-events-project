const Registration = require("../Database/Models/Registration");
const Event = require("../Database/Models/Events");

// 1. Register User for an Event
const RegisterForEventController = async (req, res) => {
    try {
        const { eventId, userEmail, userName } = req.body;
        
        // req.auth is populated by Clerk's express middleware
        const { userId } = req.auth; 

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // Check if event exists
        const eventExists = await Event.findById(eventId);
        if (!eventExists) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Create Registration
        const newRegistration = await Registration.create({
            eventId,
            clerkUserId: userId,
            userEmail,
            userName
        });

        res.status(201).json({
            status: "True",
            message: "Registration Successful!",
            Data: newRegistration
        });

    } catch (err) {
        // Catch Duplicate Key Error (Code 11000)
        if (err.code === 11000) {
            return res.status(400).json({ 
                message: "You have already registered for this event." 
            });
        }
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// 2. Check if User is Registered (for button state)
const CheckRegistrationStatusController = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.auth;

        if (!userId) {
            return res.status(200).json({ isRegistered: false });
        }

        const registration = await Registration.findOne({
            eventId: eventId,
            clerkUserId: userId
        });

        res.status(200).json({
            status: "True",
            isRegistered: !!registration // Returns true if found, false if null
        });

    } catch (err) {
        console.error("Status Check Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// 3. Get All Events User Registered For (For MyEvents Page)
const GetUserRegistrationsController = async (req, res) => {
    try {
        const { userId } = req.auth;

        // Find registrations and populate the Event details
        const registrations = await Registration.find({ clerkUserId: userId })
            .populate('eventId') // This pulls the full Event object
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: "True",
            Data: registrations
        });

    } catch (err) {
        console.error("Fetch Registrations Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

const GetTicketByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.auth; // From Clerk Middleware

        // Find ticket and populate Event details (Title, Image, Location, etc.)
        const registration = await Registration.findById(id).populate('eventId');

        if (!registration) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // SECURITY CHECK: Ensure the logged-in user owns this ticket
        if (registration.clerkUserId !== userId) {
            return res.status(403).json({ message: "Unauthorized: This ticket does not belong to you." });
        }

        res.status(200).json({
            status: "True",
            Data: registration
        });

    } catch (err) {
        console.error("Fetch Ticket Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { 
    RegisterForEventController, 
    CheckRegistrationStatusController,
    GetUserRegistrationsController,
    GetTicketByIdController
};