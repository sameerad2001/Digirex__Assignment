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

    // Returns all the events that a particular user created
    app.route("/userDetails/:userID")
        .get((req, res) => {

            EventLog.find({ userID: req.params.userID }, (err, eventsByUser) => {
                if (err)
                    res.send(err)
                else
                    res.send(eventsByUser);
            }
            )

        });


    // Number of events logged by the user
    app.route("/userFrequency")
        .get((req, res) => {

            EventLog.aggregate([
                {
                    $group: {
                        _id: '$userID',
                        numberOfUsers: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        userID: '$_id',
                        numberOfUsers: 1,
                        _id: 0
                    }
                }
            ]).then((result) => {
                res.send(result);
            })


        });

    // Find the number of user's from a given location
    app.route("/locationFrequency")
        .get((req, res) => {

            EventLog.aggregate([
                {
                    $group: {
                        _id: '$location',
                        numberOfUsers: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        location: '$_id',
                        numberOfUsers: 1,
                        _id: 0
                    }
                }
            ]).then((result) => {
                res.send(result);
            })


        })
}
