const express = require('express');
const { register, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.put('/profile', updateProfile);

module.exports = router;