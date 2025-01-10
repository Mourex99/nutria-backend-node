const admin = require('../config/firebaseConfig');

const requestPasswordResetHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const actionCodeSettings = {
      url: 'https://nutria-fdfe7.firebaseapp.com',
      handleCodeInApp: true,
    };

    const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

    res.status(200).json({ message: 'Link de redefinição de senha gerado', link });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  requestPasswordReset: requestPasswordResetHandler,
};