const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_STRING = process.env.MONGO_DB_URI;

const ConnectToDb = async ()=>{
    try{
        await mongoose.connect(CONNECTION_STRING);
    }
    catch(error){
        console.log("Failed to connect" , error);
    }
    finally{
         console.log("MongoDB Connected SuccessFully!!!");
    }
}

module.exports = {ConnectToDb}