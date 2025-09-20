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
        DROP FUNCTION IF EXISTS get_reviews(VARCHAR);

        CREATE OR REPLACE FUNCTION get_reviews(p_book_title VARCHAR)
        RETURNS TABLE(
            review_id INT,
            username VARCHAR,
            rating STAR_RATING,
            review_text TEXT,
            created_at TIMESTAMP,
            book_title VARCHAR,
            book_author VARCHAR,
            book_year INT
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT
                r.review_id,
                r.username,
                r.rating,
                r.review_text,
                r.created_at,
                b.title AS book_title,
                b.author AS book_author,
                b.year AS book_year
            FROM reviews AS r
            JOIN books AS b ON r.book_id = b.id
            WHERE b.title = p_book_title;
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
        DROP FUNCTION IF EXISTS get_reviews(VARCHAR);
        `)
};
