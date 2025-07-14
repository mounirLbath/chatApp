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


// save messages to db
let saveNewMessage = async function(msg)
{   
    try
    {    
        
        const query = "INSERT INTO messages (username, content, msg_time) VALUES (?, ?, ?)";

        // insert message in database
        await connection.execute(query, [msg.username, msg.content, msg.time]);
        
        console.log("Successfully saved message in database.");

    }
    catch(err)
    {
        console.log("An error occured while saving the message to the database: " + err);
    }
};

// returns messages to load if successfull, undefined otherwise
let loadMoreMsg = async function(msg) 
{
    try
    {    
        // convert to string
        const limit = msg.limit.toString();
        const offset = msg.offset.toString();
        
        // load "limit" last messages before the last "offset" messages
        const query = "SELECT * FROM messages ORDER BY msg_id DESC LIMIT ? OFFSET ?";
        let [rows] = await connection.execute(query, [limit, offset]);

        console.log("Successfully loaded messages from database.");
        return rows;
    }
    catch(err)
    {
        console.log("An error occured while loading messages from database. " + err);
    }
}

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
    
    socket.on('message', async (message) => {
        const msg = JSON.parse(message.toString())
        if(msg.type == 'message')
        {
            console.log(`Received message from ${msg.username}: ${msg.content}` );

            // save message to database (async)
            saveNewMessage(msg);

            // send the message to each client so they display it
            clientList.forEach((client, index)=>
            {
                if(index != currIndex)
                {
                    client.send(message.toString());
                }
            });
        }
        else if(msg.type == 'load-msg')
        {
            console.log(`Loading ${msg.number} more messages for client ${currIndex} (already ${msg.nb_msg_loaded} loaded)`);

            // load more messages
            let a = await loadMoreMsg(msg);

            
        }
        
        
    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

console.log("Server running on port", PORT);