CREATE DATABASE chat_app_db;

USE chat_app_db;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
    msg_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    msg_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

