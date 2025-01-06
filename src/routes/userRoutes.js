const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Definir rotas
router.get('/', exampleController.getExample);
router.post('/', exampleController.createExample);

module.exports = router;
