const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    // We store the Clerk User ID as a string
    clerkUserId: {
        type: String,
        required: true
    },
    // Optional: Snapshot of user details at time of booking
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["registered", "cancelled"],
        default: "registered"
    }
}, { timestamps: true });

// COMPOUND UNIQUE INDEX (CRITICAL)
// This ensures that one clerkUserId can only exist ONCE per eventId.
// If they try to register again, MongoDB will throw an error.
RegistrationSchema.index({ eventId: 1, clerkUserId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", RegistrationSchema);