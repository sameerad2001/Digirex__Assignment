// Digirex assignment : develop an api where all the click events and the browser events will be dumped
// into a database

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()

// CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())

// Middle-wares
app.use(bodyParser.urlencoded({
    extended: true
}))

// Mongoose
mongoose.connect('mongodb://localhost:27017/digirexDB', { useNewUrlParser: true })

// Mongoose Models
require("./models/eventLog")

// API Routes
require("./routes/eventLogRoutes")(app)


app.listen(4000, () => {
    console.log('server started on port 4000')
})