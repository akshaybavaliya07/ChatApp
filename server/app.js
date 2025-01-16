import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 5000;
const app = express();
const server = createServer(app);

const users = {};

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('recieve-message', {message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        const name = users[socket.id];
        socket.broadcast.emit('user-left', name);
        delete users[socket.id];
    });
});

server.listen(PORT, () => console.log(`⚙️  Server running on port ${PORT} 🕹️`));