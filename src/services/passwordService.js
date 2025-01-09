const crypto = require('crypto');
const { getUserByEmail, updateUser } = require('../models/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Redefinição de Senha',
    text: `Você solicitou a redefinição de senha. Use o seguinte token para redefinir sua senha: ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

const requestPasswordReset = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const token = generateResetToken();
  await updateUser(user.id, user.name, user.email, user.password, user.profilePicture, token);

  await sendResetEmail(email, token);
};

const resetPassword = async (email, token, newPassword) => {
  const user = await getUserByEmail(email);
  if (!user || user.resetToken !== token) {
    throw new Error('Token inválido ou expirado');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await updateUser(user.id, user.name, user.email, passwordHash, user.profilePicture, null);
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};