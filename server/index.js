require('dotenv').config();
const express = require('express');
const route = require('./routes');
const connectDb = require('./db/connectDb');
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');

connectDb();

app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
route(app);

const PORT = 4444;
//socket
let users = [];

const pushUser = (userId, socketId) => {
    (users.filter((user) => user.userId === userId).length === 0) ? users.push({ userId, socketId }) : users;
    return users
}
const closeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
    return users;
}

const chatNsp = io.of('/chat-namespace');


chatNsp.on('connect', (socket) => {
    socket.on("join-room", (data) => {
        socket.join(data);
    });
    socket.on("push-message", (data) => {
        io.of('/chat-namespace').to(data.room).emit("get-message", data);
    })
})


io.on('connection', (socket) => {
    socket.on("send-user-info", (userId) => {
        pushUser(userId, socket.id);
        io.sockets.emit("users-online", users);
    });
    socket.on("disconnect", (reason) => {
        closeUser(socket.id);
        io.sockets.emit("users-online", users);
    })

})

server.listen(PORT, () => console.log(`server runing at port: ${PORT}`));
