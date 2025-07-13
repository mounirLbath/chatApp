
const socket = new WebSocket('ws://localhost:8080');
let username = "";

// when connection successful
socket.addEventListener("open", (event) => {
    console.log("WebSocket connection successfully established!")
});

// when message received successful
socket.addEventListener("message", (event) => {
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



function onUsernameChanged()
{
    username = document.getElementById("username").value;
}

function submitChatMsg()
{

    const msg = {
        type: "message",
        text: document.getElementById("msgBox").value,
        user: username,
        date: Date.now()
    }
    sendMessage(JSON.stringify(msg));

    // reset form input
    document.getElementById("msgBox").value = "";
}