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
        DROP PROCEDURE IF EXISTS create_books_table();

        CREATE OR REPLACE PROCEDURE create_books_table()
        LANGUAGE plpgsql
        AS $$
        BEGIN
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            author VARCHAR NOT NULL,
            year INT,
            UNIQUE (title, author)
        );
        END;
        $$;

        CALL create_books_table();
        `)
};


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP PROCEDURE IF EXISTS create_books_table();
        DROP TABLE IF EXISTS books;
        `)
};
