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

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




