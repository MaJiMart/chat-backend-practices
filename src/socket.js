import { Server } from 'socket.io';

let io;

let messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', (socketClient) => {
        console.log(`Se ha conectado un nuevo cliente con id ${socketClient.id}`);

    socketClient.emit('notification', { messages })

    socketClient.broadcast.emit('new-client');

    socketClient.on('new-message', (data) => {
        const { username, text } = data;
        messages.push({ username, text });
        io.emit('notification', { messages })
    })

    socketClient.on('disconnect', () =>{
        console.log(`Se ha desconectado el cliente con id ${socketClient.id}`);
    })
});

console.log('Server socket running ✔️');
};