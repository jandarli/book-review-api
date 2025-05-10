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
        CREATE OR REPLACE FUNCTION get_books()
        RETURNS TABLE(id INT, title VARCHAR, author VARCHAR, year INT)
        LANGUAGE plpgsql
        AS $$
        BEGIN
        RETURN QUERY SELECT books.id, books.title, books.author, books.year FROM books;
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
        DROP FUNCTION IS EXISTS get_books();
        `)
};
