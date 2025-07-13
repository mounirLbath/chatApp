
const socket = new WebSocket('ws://localhost:8080');

if (socket.readyState === WebSocket.OPEN) {
// when connection successful
socket.addEventListener("open", (event) => {
    console.log("WebSocket connection successfully established!")

    socket.send("Hello server!")
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
}

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




function submitChatMsg()
{
    const text = document.getElementById("msgBox").value;
    document.getElementById("msgBox").value = "";
    sendMessage(text);
}