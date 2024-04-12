-- "F:\Programs\Postgres\14\pgAdmin 4\runtime\psql.exe" "host=localhost port=5432 dbname=test_
-- brk user=postgres sslmode=prefer connect_timeout=10"

CREATE DATABASE test_brk;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
);

INSERT INTO users (name, email) VALUES ('John Doe1', 'jhon.doe1@gmail.com'),('John Doe2', 'jhon.doe2@gmail.com');