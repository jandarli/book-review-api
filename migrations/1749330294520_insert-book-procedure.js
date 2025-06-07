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
        DROP PROCEDURE IF EXISTS insert_book(VARCHAR, VARCHAR, INT);

        CREATE OR REPLACE PROCEDURE insert_book(
            IN p_author VARCHAR(255),
            IN p_title VARCHAR(255),
            IN p_year INT
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            INSERT INTO books(title, year, author)
            VALUES (p_title, p_year, p_author);
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
        DROP PROCEDURE IF EXISTS insert_book(VARCHAR, VARCHAR, INT);
        `)
};
