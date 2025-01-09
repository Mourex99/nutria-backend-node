const pool = require('../config/db');

// Função para buscar usuário pelo email
const getUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erro ao buscar usuário por email: ${error.message}`);
    throw error;
  }
};

const createUser = async (name, email, passwordHash) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

const updateUser = async (id, name, email, passwordHash, profilePicture, resetToken) => {
  try {
    const result = await pool.query(
      'UPDATE users SET name = $2, email = $3, password = COALESCE($4, password), profile_picture = $5, reset_token = $6 WHERE id = $1 RETURNING *',
      [id, name, email, passwordHash, profilePicture, resetToken]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserByEmail,
};