const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder 
app.use(express.static(path.join(__dirname, 'html_css_js')))
const botName = 'Admin';
// Run when client connects
io.on('connection', socket => {

    //Welcome user 
    socket.emit('message', formatMessage(botName, 'Welcome to Connectine!'));

    // Broadcast to others when new user joins chat
    socket.broadcast.emit(formatMessage(botName, 'A user has joined the chat!'));

    // Broadcast to others when user leaves chat
    socket.on('disconnect', () => {
        io.emit(formatMessage(botName, 'A user has left the chat.'));
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port' + PORT));
