const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Logar os dados recebidos
    console.log('Login Realizado com sucesso!');

    // Verificar se o usuário existe
    const user = await getUserByEmail(email);
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Senha incorreta');
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Logar a geração do token
    console.log('Token gerado:', token);

    // Retornar o token e os dados do usuário
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro no login do usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  login,
};