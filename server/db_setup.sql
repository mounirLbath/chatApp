CREATE DATABASE chat_app_db;

USE chat_app_db;

CREATE TABLE messages (
    msg_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    content TEXT,
    msg_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);