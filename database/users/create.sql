CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    token VARCHAR(300) NOT NULL,
    UNIQUE (username),
    UNIQUE (email),
    UNIQUE (token)
)
