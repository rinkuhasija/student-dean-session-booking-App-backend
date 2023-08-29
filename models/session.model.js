const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    date: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booked: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    length: { type: String, default: "1hr", enum: ["1hr"] },
    bookedBy: { type: String },
    deanName: { type: String },
},
    { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
