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
        DROP PROCEDURE IF EXISTS create_users_table();

        CREATE OR REPLACE PROCEDURE create_users_table()
        LANGUAGE plpgsql 
        AS $$
        BEGIN 
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR NOT NULL,
                username VARCHAR NOT NULL,
                password VARCHAR NOT NULL CHECK (char_length(password) >= 8),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (email),
                UNIQUE (username)
            );
        END;
        $$;

        CALL create_users_table();
         `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP PROCEDURE IF EXISTS create_users_table();
        DROP TABLE IF EXISTS users;
        `)
};
