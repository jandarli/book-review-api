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
        CREATE OR REPLACE PROCEDURE insert_book(
        IN author VARCHAR(255),
        IN title VARCHAR(255),
        IN year INTEGER
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
        INSERT INTO books(title, year, author)
        VALUES (title, year, author);
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
        DROP PROCEDURE IF EXISTS insert_books(VARCHAR, VARCHAR, INTEGER);
        `)
};
