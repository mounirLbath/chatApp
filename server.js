const WebSocket = require('ws');

PORT = 8080 

const server = new WebSocket.Server({port: PORT});
let clientList = [];

server.on('connection', (socket) => {
    console.log(`Client ${clientList.length} connected!`);
    clientList.push(socket);
    
    socket.on('message', (message) => {
        const msg = JSON.parse(message.toString())

        if(msg.type == 'message')
        {
            console.log("Received:", msg.text);
            clientList.forEach((client, index)=>
            {
                client.send(`${msg.user}: ${msg.text}`);
                console.log(`"${msg.text}" was sent to client ${index}`);
            });
        }
        
        
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

console.log("Server running on port", PORT);