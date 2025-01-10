const admin = require('../config/firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Configurar o Firebase Client SDK
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticar o usuário com o Firebase Client SDK
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Gerar um token personalizado usando o Firebase Admin SDK
    const token = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({ token, user: { id: user.uid, name: user.displayName, email: user.email } });
  } catch (error) {
    console.error('Erro no login do usuário:', error);
    res.status(401).json({ message: 'Email ou senha incorretos' });
  }
};

module.exports = {
  login,
};