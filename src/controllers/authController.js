const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getUserByEmail} = require('../models/userModel');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
          return res.status(400).json({ message: 'Usuário não encontrado' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Senha incorreta' });
        }
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
      }
};

module.exports = {
    login,
};