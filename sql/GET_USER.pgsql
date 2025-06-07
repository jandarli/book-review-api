CREATE OR REPLACE FUNCTION get_user(
    IN p_username VARCHAR DEFAULT NULL
)
RETURNS TABLE(id INT, username VARCHAR, email VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.username, users.email
    FROM users
    WHERE (p_username IS NULL OR users.username ILIKE '%' || p_username || '%');
END;
$$;