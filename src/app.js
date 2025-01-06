const express = require('express');
const app = express();
const exampleRoutes = require('./routes/exampleRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/example', exampleRoutes);

module.exports = app;
