DROP PROCEDURE IF EXISTS create_books_table();

CREATE OR REPLACE PROCEDURE create_books_table()
LANGUAGE plpgsql
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    year INT,
    UNIQUE (title, author)
  );
END;
$$;
