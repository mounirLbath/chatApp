const WebSocket = require('ws');

PORT = 8080 

const server = new WebSocket.Server({port: PORT});


server.on('connection', (socket) => {
    console.log("Client connected!")

    socket.on('message', (message) => {
        console.log("Received:", message);
    });


    socket.on('close', () => {
        console.log("Client disconnected")
    });
});

console.log("Server running on port", PORT);