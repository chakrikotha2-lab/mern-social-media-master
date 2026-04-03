// server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');

// CORS configuration
const corsOptions = {
  credentials: true,  // Allow credentials like cookies
  origin: "*",        // Allow all origins (use a specific domain in production)
};

const app = express();

// Middleware setup
app.use(express.json());  // For parsing JSON bodies
app.options("*", cors(corsOptions)); // Enable CORS for pre-flight requests
app.use(cors(corsOptions));  // Enable CORS for all routes
app.use(cookieParser());  // To handle cookies

// Socket setup
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Handle new socket connections
io.on('connection', socket => {
    SocketServer(socket);  // You can define socket events in this file
});

// Routes setup
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// MongoDB connection setup
const URI = process.env.MONGODB_URL;  // MongoDB URI from .env file

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start the server
const port = process.env.PORT || 8080;  // Use the port from the .env file or default to 8080
http.listen(port, () => {
  console.log("Server is running on port", port);
});
