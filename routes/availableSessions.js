const express = require('express');
const router = express.Router();
const Session = require("../models/session.model");
const requireAuthStudent = require('../middlewares/requireAuthStudent');


//Student views free sessions
router.get('/', requireAuthStudent, async (req, res) => {

    try {
        const currentDate = new Date();
        const availableSessions = await Session.find({
            booked: false,
            date: { $gt: currentDate }
        },
            { bookedBy: 0, __v: 0, user: 0, createdAt: 0, updatedAt: 0 });

        if (availableSessions.length === 0) {
            return res.status(404).json({ message: 'No sessions available' });
        }
        res.json(availableSessions);

    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }

});

module.exports = router;