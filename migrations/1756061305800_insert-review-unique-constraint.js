/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
        DROP PROCEDURE IF EXISTS insert_review(INT, VARCHAR, STAR_RATING, TEXT);

        CREATE OR REPLACE PROCEDURE insert_review(
            IN p_book_id INT,
            IN p_username VARCHAR, 
            IN p_star_rating STAR_RATING,
            IN p_review_text TEXT
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            INSERT INTO reviews(book_id, username, rating, review_text)
            VALUES (p_book_id, p_username, p_star_rating, p_review_text);
        EXCEPTION
            WHEN unique_violation THEN
                RAISE EXCEPTION 'User % has already reviewed book with id %', p_username, p_book_id;
        END;
        $$;
        `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP PROCEDURE IF EXISTS insert_review(INT, VARCHAR, STAR_RATING, TEXT);
        `)
};
