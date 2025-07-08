DROP TABLE IF EXISTS user;

-- create the users table
CREATE TABLE users (
   userId INT AUTO_INCREMENT SERIAL PRIMARY KEY,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   type ENUM('admin', 'user') NOT NULL DEFAULT 'user',
   active BOOLEAN DEFAULT TRUE,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

DROP PROCEDURE IF EXISTS addUser;

DELIMITER //
CREATE PROCEDURE addUser(
  IN p_email VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_type ENUM('admin', 'user'),
  IN p_active BOOLEAN
)
BEGIN 
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active);
END;
//
DELIMITER;

CALL addUser('nowshadislam02@gmail.com', 'examplePassword', 'user', TRUE);