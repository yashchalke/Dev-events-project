const Event = require("../Database/Models/Events");

const CreateEventController = async(req, res) => {
    try {
        // 1. Extract all fields (Old + New)
        const { 
            title, 
            image, 
            slug, 
            location, 
            date, 
            time, 
            address,      // New
            organizer,    // New
            description,  // New
            agenda        // New
        } = req.body;

        // 2. Validate required fields
        // Note: 'agenda' is excluded here if you want it to be optional, 
        // but ensure the others are present.
        if (!title || !image || !slug || !location || !date || !time || !address || !organizer || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 3. Create the event in DB
        const event = await Event.create({
            title,
            image,
            slug,
            location,
            date,
            time,
            address,
            organizer,
            description,
            agenda // Can be empty string if not provided
        });

        if (event) {
            res.status(201).json({
                status: "True",
                message: "Event Created Successfully!!",
                Data: event
            })
        }

    } catch (err) {
        console.error("Error creating event:", err);
        
        if (err.code === 11000) {
            return res.status(400).json({ message: "Slug (Tagline) must be unique" });
        }
        
        res.status(500).json({ message: "Server Error" });
    }
};

const GetEventByIdController = async (req, res) => {
  try {
    const { id } = req.params; // This captures the value from the URL (which is the 'slug')

    // Find the event where the 'slug' field matches the URL parameter
    const event = await Event.findOne({ slug: id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      status: "True",
      message: "Event Fetched Successfully",
      Data: event
    });

  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const GetAllEventsController = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ events });
    if(!events){
        res.json(200).json({
            status:"Success",
            Message:"No events Available"
        })
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {CreateEventController,GetAllEventsController,GetEventByIdController}