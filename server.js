//import required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config(); //  .env file

//import required modules
const connectDB = require('./config/db');

//import routes
const studentAuth = require("./routes/studentAuth");
const deanAuth = require("./routes/deanAuth");
const sessions = require("./routes/availableSessions");
const bookSession = require("./routes/bookSession");
const viewPendingSession = require("./routes/viewPendingSession");

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Enable CORS
app.use(cors());

// Middleware - Parse JSON request body
app.use(express.json());

// Middleware - Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// student routes
app.use('/api/v1/auth', studentAuth);

//dean routes
app.use('/api/v1/auth', deanAuth);

//sessions routes
app.use('/api/v1/sessions', sessions);

//book session routes
app.use('/api/v1', bookSession);

//view pending session routes
app.use('/api/v1', viewPendingSession);

app.get('/', (req, res) => {
    res.status(200).json('Server is up and running');
});

//non existing routes
app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on the server`)
    err.status = "fail";
    err.statusCode = 404;

    next(err);
})

// Error handler middleware
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





