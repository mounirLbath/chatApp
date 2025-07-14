
const socket = new WebSocket('ws://localhost:8080');

let nb_msg_loaded = 0;



/************************ SERVICES *************************************** */

// add event listeners for websocket connection

// when connection successful
socket.addEventListener("open", (event) => {
    console.log("WebSocket connection successfully established!")
});

// when message received successful
socket.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    if(msg.type == "message")
    {
        displayMessage(msg);
        console.log("Message received from server:", event.data);
    }
    else if(msg.type == "load-msg")
    {
        displayOldMessages(msg.rows);
        console.log("Old messages loaded:", event.data)
    }
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


// send a new chat message
function submitChatMsg()
{
    // convert to timestamp
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const timestamp = new Date(timestampInSeconds * 1000).toISOString().slice(0, 19).replace('T', ' ');

    const msg = {
        type: "message",
        content: document.getElementById("msgBox").value,
        username: document.getElementById("username").value,
        msg_time: timestamp
    };
    sendMessage(JSON.stringify(msg));
    displayMessage(msg); 

    // reset form input
    document.getElementById("msgBox").value = "";
}

//load more messages
function loadMoreMsg()
{
    const msg = {
        type: "load-msg",
        limit: 5, //nb messages to load
        offset: nb_msg_loaded //nb messages already loaded
    };
    sendMessage(JSON.stringify(msg));
}


/********************** VIEW ********************** */


// strip html tags from str
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// when a message is received
function displayMessage(msg, isNew = true)
{
    const container = document.getElementById("messages");
    const p = document.createElement("p");

    const bold = document.createElement("b");
    bold.textContent = msg.username;

    const italic = document.createElement("i");
    const msg_time = new Date(msg.msg_time);
    const displayTime = msg_time.toLocaleString();
    italic.textContent = displayTime;

    const text = document.createTextNode(` - (`);
    const closing = document.createTextNode(`): ${msg.content}`);

    p.appendChild(bold);
    p.appendChild(text);
    p.appendChild(italic);
    p.appendChild(closing);

    if(isNew)
    {
        container.append(p) //old messages appear at the bottom
    }
    else
    {
        container.prepend(p); //old messages appear at the top
    }
    nb_msg_loaded++;
}

// no more messages to load
function displayNoMoreMsg()
{
    const container = document.getElementById("messages");
    const p = document.createElement("p");
    const text = document.createTextNode("No more messages :)");
    p.appendChild(text);

    container.prepend(p);
}

// when older messages are received
function displayOldMessages(msgList)
{
    if(msgList.length > 0)
    {
        msgList.forEach(element => {
            displayMessage(element, false);
        });
    }
    else //no more messages to display
    {
        displayNoMoreMsg();
    }
    
}