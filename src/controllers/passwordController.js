const { requestPasswordReset, resetPassword } = require('../services/passwordService');

const requestPasswordResetHandler = async (req, res) => {
  const { email } = req.body;

  try {
    await requestPasswordReset(email);
    res.status(200).json({ message: 'Email de redefinição de senha enviado' });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const resetPasswordHandler = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    await resetPassword(email, token, newPassword);
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  requestPasswordReset: requestPasswordResetHandler,
  resetPassword: resetPasswordHandler,
};