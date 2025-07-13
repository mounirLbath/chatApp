const WebSocket = require('ws');

PORT = 8080 

const server = new WebSocket.Server({port: PORT});
let clientList = [];

server.on('connection', (socket) => {
    console.log(`Client ${clientList.length} connected!`);
    clientList.push(socket);
    
    socket.on('message', (message) => {
        console.log("Received:", message.toString());
        clientList.forEach((client, index)=>
            {
                console.log(`"${message.toString()}" was sent to client ${index}`);
                client.send(message.toString());
            });
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

console.log("Server running on port", PORT);