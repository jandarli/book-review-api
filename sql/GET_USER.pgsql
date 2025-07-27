DROP FUNCTION IF EXISTS get_user(VARCHAR);

CREATE OR REPLACE FUNCTION get_user(
    IN p_username VARCHAR
)
RETURNS TABLE(id INT, username VARCHAR, email VARCHAR, password VARCHAR, role user_role)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT users.id, users.username, users.email, users.password, users.role
    FROM users
    WHERE users.username = p_username;
END;
$$;