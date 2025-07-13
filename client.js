
const socket = new WebSocket('ws://localhost:8080');


// username set by user 
let username = "";

// add event listeners for websocket connection

// when connection successful
socket.addEventListener("open", (event) => {
    console.log("WebSocket connection successfully established!")
});

// when message received successful
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    displayMessage(msg);
    console.log("Message received from server:", event.data);
});

// when connection closed
socket.addEventListener("close", (event) => {
    console.log("Connection closed!")
});

// when error occurs
socket.addEventListener("error", (error) => {
    console.log("Error:", error);
});

function sendMessage(msg)
{
    if (socket.readyState === WebSocket.OPEN) {
        
        socket.send(msg);
        console.log(`"${msg}" was sent to the server successfully!`);
    }
    else
    {
        console.log("Not connected, cannot send");
    }
}


// Utilities


// when username is changed
function onUsernameChanged()
{
    username = document.getElementById("username").value;
}

// send a new chat message
function submitChatMsg()
{
    // convert to timestamp
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const timestamp = new Date(timestampInSeconds * 1000).toISOString().slice(0, 19).replace('T', ' ');

    const msg = {
        type: "message",
        content: document.getElementById("msgBox").value,
        username: username,
        time: timestamp
    };
    sendMessage(JSON.stringify(msg));
    displayMessage(msg); 

    // reset form input
    document.getElementById("msgBox").value = "";
}

// when a message is received

function displayMessage(msg)
{
    document.getElementById("messages").innerHTML += `<p><b>${msg.username}</b> - (<i>${msg.time}</i>): ${msg.content}</p>`;
}