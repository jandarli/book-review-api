CREATE OR REPLACE FUNCTION get_books()
RETURNS TABLE(id INT, title VARCHAR, author VARCHAR, year INT)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY SELECT books.id, books.title, books.author, books.year FROM books;
END;
$$;
