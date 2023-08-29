const express = require('express');
const router = express.Router();
const Session = require("../models/session.model");
const requireAuthDean = require('../middlewares/requireAuthDean');
const User = require("../models/user.model");

// Dean view pending sessions
router.get('/sessions/pending/', requireAuthDean, async (req, res) => {
    const token = req.headers.authorization;
    const currentDate = new Date();

    try {
        const dean = await User.findOne({ token: token });
        const deanId = dean._id;
        const pendingSessions = await Session.find(
            { user: deanId, booked: true, date: { $gt: currentDate } },
            { __v: 0, user: 0, createdAt: 0, updatedAt: 0 }
        );
        res.json(pendingSessions);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
