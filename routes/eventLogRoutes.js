const mongoose = require("mongoose")
const EventLog = mongoose.model("EventLog")

// Obtain user's location
const geoip = require('geoip-lite');

module.exports = (app) => {

    app.route("/eventLog")
        .get((req, res) => {

            EventLog.find((err, oldLogs) => {
                if (err)
                    res.send(err);
                else
                    res.send(oldLogs);
            })

        })
        .post((req, res) => {

            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const location = geoip.lookup(ip); // location of the user

            const newEventLog = new EventLog({
                browserName: req.body.browserName,
                userIP: ip,
                location: location,
                eventType: req.body.eventType,
                userID: req.body.userID,
            });

            newEventLog.save((err) => {
                if (err)
                    res.send(err)
                else
                    res.send("Recorded a new event")
            })
        });
}
