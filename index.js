require('dotenv').config()
const express = require ("express")
const mongoose = require('mongoose')
const http = require('http');
const { Server } = require("socket.io");
const app = require('./src/app')
// const server = http.createServer(app);
// const io = new Server(server);
const cors = require('cors');
const port = process.env.PORT || 8001;



const corsOptions = {
    origin: 'https://goyaldeepak87.github.io/ChatSoket.io/', // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials to be sent
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://goyaldeepak87.github.io/ChatSoket.io/', // Allow this origin for Socket.IO
        methods: ['GET', 'POST'],
        credentials: true
    }
});


// Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.emit('connectionId', socket.id); // Emit the connection ID back to the client

    // // Handle disconnection
    socket.on('user-message', (message) => {
        console.log('user-message', message);
        io.emit('message', message)
    });

});



// let apiServers;
mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>{
    server.listen(port, ()=>{
        console.log(`start server ${process.env.MongoConection, port}`)
    })
})


