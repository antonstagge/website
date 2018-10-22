DROP TABLE IF EXISTS message;

CREATE TABLE IF NOT EXISTS message (
    message_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    message VARCHAR(255) NOT NULL
);

INSERT INTO message(name, email, message) VALUES
    ("Anton Stagge", "stagge@kth.se", "Gud vad fin du e");
