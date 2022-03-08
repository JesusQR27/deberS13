ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


flush privileges;


CREATE DATABASE database_links;


Use database_links;
--user table
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(255) NOT NULL,
    contraseña VARCHAR(70) NOT NULL,
    fullname VARCHAR(255) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT =1;

DESCRIBE users;

--links table
CREATE TABLE links (
    id INT(11) NOT NULL,
    tilte VARCHAR(255) NOT NULL,
    description TEXT ,
    url varchar(255) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN key (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
    MODIFY id INT(11) NOT NULL  AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE links;