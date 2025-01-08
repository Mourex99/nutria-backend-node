const bcrypt = require('bcryptjs');
const { createUser, updateUser } = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Iniciando registro de usuário');
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Senha criptografada');
    const newUser = await createUser(name, email, passwordHash);
    console.log('Usuário criado:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro no registro de usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const updateProfile = async (req, res) => {
  const { id, name, email, password, profilePicture } = req.body;

  try {
    console.log('Iniciando atualização de perfil');
    if (!id) {
      console.log('ID do usuário é obrigatório');
      return res.status(400).json({ message: 'ID do usuário é obrigatório' });
    }

    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const updatedUser = await updateUser(id, name, email, passwordHash, profilePicture);
    console.log('Perfil atualizado:', updatedUser);

  } catch (error) {
    console.error('Erro na atualização do perfil:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  register,
  updateProfile,
};