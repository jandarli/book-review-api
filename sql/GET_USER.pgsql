DROP FUNCTION IF EXISTS get_user(VARCHAR);

CREATE OR REPLACE FUNCTION get_user(
    IN p_username VARCHAR
)
RETURNS TABLE(id INT, username VARCHAR, email VARCHAR, password VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.username, users.email, users.password
    FROM users
    WHERE users.username = p_username;
END;
$$;