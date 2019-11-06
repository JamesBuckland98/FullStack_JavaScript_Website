DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    UserID int NOT NULL AUTO_INCREMENT,
    Username VARCHAR(20) NOT NULL UNIQUE,
    UserPassword int NOT NULL,
    PRIMARY KEY(UserID)
);

DROP TABLE IF EXISTS ChatHistory;
CREATE TABLE ChatHistory(
	ChatID int NOT NULL AUTO_INCREMENT,
    Username VARCHAR(20) NOT NULL,
    ChatMessage varchar(255) NOT NULL,
    Species varchar(255)  DEFAULT 'Unkown' NOT NULL,
    Abundance int NOT NULL,
    ChatTimeStamp DATETIME NOT NULL,
    Longitude FLOAT,
    Latitude FLOAT,
    Weather FLOAT,
    PRIMARY KEY(ChatID)
);

INSERT INTO Users(Username, UserPassword) VALUES ('James', 12345); 