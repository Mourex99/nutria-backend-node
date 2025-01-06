const bcrypt = require('bcryptjs');
const { createUser, updateUser } = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, passwordHash);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const updateProfile = async (req, res) => {
  const { id, name, email, password, profilePicture } = req.body;

  try {
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await updateUser(id, name, email, passwordHash, profilePicture);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  register,
  updateProfile,
};