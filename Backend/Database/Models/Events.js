const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    // Step 1 Fields
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },

    // Step 2 Fields (New)
    address: { 
        type: String, 
        required: true 
    },
    organizer: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    agenda: { 
        type: String, 
        default: "" // Optional, as some events might not have a detailed agenda yet
    },

    createdBy: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);