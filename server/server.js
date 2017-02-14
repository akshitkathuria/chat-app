const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicpath = path.join(__dirname,"../public");

const port = process.env.port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath)); 

io.on('connection', (socket)=>{
    console.log('New User Connected');

    socket.on("createMessage", (message) => {
        console.log('Create Message', message);

        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
});

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});