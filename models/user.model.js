const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    universityId: { type: String, unique: true, required: true, minLength: 5, maxLength: 5 },
    password: { type: String, required: true, minLength: 6 },
    token: { type: String },
    name: { type: String },
    role: { type: String, enum: ["student", "dean"], required: true }
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema)
module.exports = User;