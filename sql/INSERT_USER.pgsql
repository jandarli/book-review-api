DROP PROCEDURE IF EXISTS insert_user(VARCHAR, VARCHAR, VARCHAR);

CREATE OR REPLACE PROCEDURE insert_user(
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users(username, email, password)
    VALUES (p_username, p_email, p_password);
END;
$$;
