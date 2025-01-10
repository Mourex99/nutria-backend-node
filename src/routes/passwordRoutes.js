const express = require('express');
const { requestPasswordReset } = require('../controllers/passwordController');
const router = express.Router();

router.post('/request-reset', requestPasswordReset);

module.exports = router;