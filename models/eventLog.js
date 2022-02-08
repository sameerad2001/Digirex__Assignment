const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventLogSchema = new Schema({
    browserName: String,
    // IP may contain special characters
    userIP: String,
    location: String,
    eventType: String,
    // A combination of alphabets and numbers
    userID: String,
})

const EventLog = mongoose.model("EventLog", eventLogSchema)