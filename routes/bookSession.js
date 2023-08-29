const express = require('express');
const router = express.Router();
const Session = require("../models/session.model");
const User = require("../models/user.model");
const requireAuthStudent = require('../middlewares/requireAuthStudent');

// Student book a session
router.post('/session/book', requireAuthStudent, async (req, res) => {
    const token = req.headers.authorization;
    const { sessionId, universityId } = req.body;

    try {
        const session = await Session.findOne({ _id: sessionId, booked: false });
        const student = await User.findOne({ universityId: universityId, token: token });
        if (!session) {
            return res.status(404).json({ message: 'Session not found or already booked' });
        }

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        session.booked = true;
        session.bookedBy = student.name;
        await session.save();
        res.json({
            message: 'Session booked successfully',
            sessionId: session._id, booked: session.booked, bookedBy: session.bookedBy
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error.message
        });
    }
});

module.exports = router;