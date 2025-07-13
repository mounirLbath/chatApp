
const socket = new WebSocket('ws://localhost:8080');

// when connection successful
socket.addEventListener("open", (event) => {
    console.log("WebSocket connection successfully established!")

    socket.send("Hello server!")
});


socket.addEventListener("message", (event) => {
    console.log("Message received from server:", event.data);
});

socket.addEventListener("close", (event) => {
    console.log("Connection closed!")
});

socket.addEventListener("error", (error) => {
    console.log("Error:", error);
});