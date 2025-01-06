const pool = require('../config/db');

const createUser = async (name, email, passwordHash) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, passwordHash]
    );
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const updateUser = async (id, name, email, passwordHash, profilePicture) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3, profile_picture = $4 WHERE id = $5 RETURNING *',
        [name, email, passwordHash, profilePicture, id]
    );
    return result.rows[0];
};

module.exports = {
    createUser,
    getUserByEmail,
    updateUser,
};