INSERT INTO users(username, email, password, token)
VALUES($1, $2, $3, $4)
RETURNING *
