require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
// const eventRoutes = require("./routes/eventRoutes");
const { ConnectToDb } = require("./Database/db");
const EventRouter = require("./Routes/EventRoutes");
const registrationRoutes = require("./Routes/RegistrationRoutes");

const app = express();
ConnectToDb();
app.use(express.json());
app.use(cors());
app.use('/api/events',EventRouter);
app.use("/api/registrations", registrationRoutes);


// Routes
// app.use("/api/events", eventRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
