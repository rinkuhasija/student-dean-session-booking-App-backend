const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config(); //  .env file
const User = require("../models/user.model");
const uuid = require('uuid');

// Student Register
router.post('/register/student', async (req, res) => {
    const { name, universityId, password, role } = req.body;
    if (!name || !universityId || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingStudent = await User.findOne({ universityId });
    if (existingStudent) {
        return res.status(400).json({ error: 'Student already exists' });
    }

    if (role !== "student") {
        return res.status(400).json({ error: 'Role must be student' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            password: hashedPassword,
            universityId,
            role
        });
        await user.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Student Login
router.post('/login/student', async (req, res) => {

    try {

        const { universityId, password } = req.body;
        if (!universityId || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ universityId });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Id or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Id or password' });
        }

        //generate uuid token
        const token = uuid.v4();
        user.token = token;
        await user.save();

        res.status(200).json({ message: "Student logged in successfully", token: token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

module.exports = router;