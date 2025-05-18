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
        CREATE OR REPLACE FUNCTION get_book(
            IN p_title VARCHAR DEFAULT NULL,
            IN p_author VARCHAR DEFAULT NULL, 
            IN p_year INT DEFAULT NULL
        )
        RETURNS TABLE (id INT, title VARCHAR, author VARCHAR, year INT)
        LANGUAGE plpgsql
        AS $$ 
        BEGIN 
            RETURN QUERY SELECT books.id, books.title, books.author, books.year
                         FROM books 
                         WHERE (p_title IS NULL OR books.title ILIKE '%' || p_title || '%')
                            AND (p_author IS NULL OR books.author ILIKE '%' || p_author || '%' )
                            AND (p_year IS NULL OR books.year = p_year);
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
        DROP FUNCTION IF EXISTS get_books(VARCHAR, VARCHAR, INT);
        `)
};
