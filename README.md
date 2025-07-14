# Instant Chat App

This is an instant chat app. It uses:
-A NodeJS server using WebSockets for live conversations
-MySQL to handle message saving
-HTML and JS for frontend

<img width="1920" height="1080" alt="Screenshot from 2025-07-14 23-21-54" src="https://github.com/user-attachments/assets/f6ab34ae-9803-4eb2-8e28-05fa4dee4f72" />

## Server
Server files are in the folder /server

1) Run `npm install` to install node js dependencies.
2) Install MySQL server
3) Run /server/db_setup.sql to create the database
4) add a `.env` file containing 2 variables `DB_USER` (database user) and `DB_PASSWORD`
5) Run `node server.js` to launch the server

## Client
Client files are in the folder /client

1) Change server IP address and port on line 2 of /client/client.js
2) Just run index.html on a localhost (for instance create one with `python -m http.server`)

Have fun !

