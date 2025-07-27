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
        DROP FUNCTION IF EXISTS get_user(VARCHAR);

        CREATE OR REPLACE FUNCTION get_user(
            IN p_username VARCHAR
        )
        RETURNS TABLE(id INT, username VARCHAR, email VARCHAR, password VARCHAR, role user_role)
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT users.id, users.username, users.email, users.password, users.role
            FROM users
            WHERE users.username = p_username;
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
        DROP FUNCTION IF EXISTS get_user(VARCHAR);

        CREATE OR REPLACE FUNCTION get_user(
            IN p_username VARCHAR
        )
        RETURNS TABLE(id INT, username VARCHAR, email VARCHAR, password VARCHAR)
        LANGUAGE plpgsql
        AS $$
        BEGIN
            RETURN QUERY
            SELECT users.id, users.username, users.email, users.password
            FROM users
            WHERE users.username = p_username;
        END;
        $$;
        `)
};
