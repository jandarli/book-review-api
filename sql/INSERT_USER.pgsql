DROP PROCEDURE IF EXISTS insert_user(VARCHAR, VARCHAR, VARCHAR, USER_ROLE);

CREATE OR REPLACE PROCEDURE insert_user(
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_role USER_ROLE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users(username, email, password, role)
    VALUES (p_username, p_email, p_password, p_role);
END;
$$;
