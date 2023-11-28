DROP DATABASE IF EXISTS calendar_db;

CREATE DATABASE calendar_db;

USE calendar_db;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    creator_id INT NOT NULL,
    event_link VARCHAR(255),
    FOREIGN KEY (creator_id) REFERENCES User(id)
);

CREATE TABLE UserEvent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    user_role VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (event_id) REFERENCES Event(id)
);

CREATE TABLE Availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_event_id INT,
    FOREIGN KEY (user_event_id) REFERENCES UserEvent(id)
);