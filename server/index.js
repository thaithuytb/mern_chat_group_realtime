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

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on("hello", (data) => {
        console.log(data);
    })
})

server.listen(PORT, () => console.log(`server runing at port: ${PORT}`));