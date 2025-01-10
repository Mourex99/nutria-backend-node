const admin = require('../config/firebaseConfig');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Criar usuário com email e senha
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Atualizar o nome do usuário
    await admin.auth().updateUser(userRecord.uid, {
      displayName: name,
    });

    res.status(201).json(userRecord);
  } catch (error) {
    console.error('Erro no registro de usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const updateProfile = async (req, res) => {
  const { id, name, email, password, profilePicture } = req.body;

  try {
    const updateData = {
      displayName: name,
      email,
      photoURL: profilePicture,
    };

    if (password) {
      updateData.password = password;
    }

    const userRecord = await admin.auth().updateUser(id, updateData);

    res.status(200).json(userRecord);
  } catch (error) {
    console.error('Erro na atualização do perfil:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  register,
  updateProfile,
};