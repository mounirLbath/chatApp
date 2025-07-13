import {WebSocketServer} from 'ws';
import mysql from 'mysql2/promise';
import 'dotenv/config';


const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbName = 'chat_app_db';

// Create a connection to the database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: dbUser,        
    password: dbPassword,
    database: dbName
});

console.log("Database connection established");

let saveNewMessage = async function(msg)
{   
    try
    {
        // convert to timestamp
        const timestampInSeconds = Math.floor(msg.msg_time / 1000);
        const sqlTimestamp = new Date(timestampInSeconds * 1000).toISOString().slice(0, 19).replace('T', ' ');
        
        // insert message in database
        await connection.query(`INSERT INTO messages (username, content, msg_time) VALUES ('${msg.username}', '${msg.text}', '${sqlTimestamp}')`);
        
        console.log("Successfully saved message in database." + err);

    }
    catch(err)
    {
        console.log("An error occured while saving the message to the database: " + err);
    }
};

// create web socket server
const PORT = 8080 
const server = new WebSocketServer({port: PORT});

// list of all clents connected to server
let clientList = [];

// when the connection is live
server.on('connection', (socket) => {
    console.log(`Client ${clientList.length} connected!`);
    clientList.push(socket);
    const currIndex = clientList.length-1;
    
    socket.on('message', (message) => {
        const msg = JSON.parse(message.toString())

        if(msg.type == 'message')
        {
            console.log(`Received message from ${msg.username}: ${msg.text}` );

            // save message to database (async)
            saveNewMessage(msg);

            // send the message to each client so they display it
            clientList.forEach((client, index)=>
            {
                if(index != currIndex)
                {
                    client.send(`${msg.username}: ${msg.text}`);
                }
            });
        }
        
        
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

console.log("Server running on port", PORT);