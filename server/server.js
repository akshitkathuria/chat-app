const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')

const publicpath = path.join(__dirname,"../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicpath)); 



io.on('connection', (socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat app"))

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New User Joined"))

    socket.on("createMessage", (message) => {
        console.log('Create Message', message);

        io.emit("newMessage", generateMessage(message.from, message.text));

        /*socket.broadcast.emit("newMessage", {
            from: message.from,
            text:  message.text,
            createdAt:  new Date().getTime()
        })*/
    })

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
});

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});