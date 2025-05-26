CREATE OR REPLACE PROCEDURE create_users_table()
LANGUAGE plpgsql 
AS $$
BEGIN 
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL CHECK (char_length(password) >= 8),,  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (email)
    );
END;
$$;