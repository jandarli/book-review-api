CREATE OR REPLACE PROCEDURE insert_book(
    IN author VARCHAR(255),
    IN title VARCHAR(255),
    IN year INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO books(title, year, author)
    VALUES (title, year, author);
END;
$$;
