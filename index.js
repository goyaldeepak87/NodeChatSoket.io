require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create express app
const app = express();

// CORS options for both local and production origins
const corsOptions = {
    origin: ['http://localhost:3000', 'https://goyaldeepak87.github.io/ChatSoket.io/'], // Allowed origins
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials like cookies to be sent
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Preflight OPTIONS requests

// Socket.IO server setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://goyaldeepak87.github.io/ChatSoket.io/'],
        methods: ['GET', 'POST'],
        credentials: true,  // Allow credentials
    },
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Emit connection ID to client
    socket.emit('connectionId', socket.id);

    // Handle user messages
    socket.on('user-message', (message) => {
        console.log('User message:', message);
        io.emit('message', message);  // Broadcast message to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        server.listen(process.env.PORT || 8001, () => {
            console.log(`Server running on port ${process.env.PORT || 8001}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
