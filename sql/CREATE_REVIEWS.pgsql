DROP PROCEDURE IF EXISTS create_reviews_table(); 

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'star_rating') THEN
        CREATE TYPE star_rating AS ENUM ('1', '2', '3', '4', '5');
    END IF;
END$$;

CREATE OR REPLACE PROCEDURE create_reviews_table()
LANGUAGE plpgsql
AS $$
BEGIN 
    CREATE TABLE IF NOT EXISTS reviews (
        review_id SERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL, 
        rating STAR_RATING NOT NULL,
        book_id INT NOT NULL REFERENCES books(id),
        review_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ); 
END; 
$$;
