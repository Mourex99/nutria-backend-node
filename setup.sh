#!/bin/bash

# Função para criar diretório apenas se ele não existir
create_directory() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    echo "Diretório $1 criado."
  else
    echo "Diretório $1 já existe."
  fi
}

# Função para criar arquivo apenas se ele não existir
create_file() {
  if [ ! -f "$1" ]; then
    touch "$1"
    echo "Arquivo $1 criado."
  else
    echo "Arquivo $1 já existe."
  fi
}

# Criar diretórios
create_directory "src/config"
create_directory "src/controllers"
create_directory "src/middlewares"
create_directory "src/models"
create_directory "src/routes"
create_directory "src/services"
create_directory "src/utils"

# Criar arquivos de configuração
create_file "src/config/config.js"
create_file ".env"
create_file ".gitignore"

# Adicionar conteúdo ao .gitignore apenas se ainda não estiver presente
if ! grep -q "node_modules" .gitignore; then
  echo "node_modules" >> .gitignore
  echo "Adicionado node_modules ao .gitignore."
else
  echo "node_modules já está no .gitignore."
fi

if ! grep -q ".env" .gitignore; then
  echo ".env" >> .gitignore
  echo "Adicionado .env ao .gitignore."
else
  echo ".env já está no .gitignore."
fi

# Função para criar arquivo com conteúdo apenas se ele não existir
create_file_with_content() {
  if [ ! -f "$1" ]; then
    echo "$2" > "$1"
    echo "Arquivo $1 criado com conteúdo."
  else
    echo "Arquivo $1 já existe."
  fi
}

# Criar arquivos de exemplo com conteúdo básico
create_file_with_content "src/controllers/exampleController.js" \
"const exampleService = require('../services/exampleService');

exports.getExample = async (req, res) => {
    try {
        const data = await exampleService.getExample();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createExample = async (req, res) => {
    try {
        const newData = await exampleService.createExample(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};"

create_file_with_content "src/middlewares/authMiddleware.js" \
"// Middleware de autenticação
module.exports = (req, res, next) => {
    // Lógica de autenticação
    next();
};"

create_file_with_content "src/models/exampleModel.js" \
"const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Example', exampleSchema);"

create_file_with_content "src/routes/exampleRoutes.js" \
"const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Definir rotas
router.get('/', exampleController.getExample);
router.post('/', exampleController.createExample);

module.exports = router;"

create_file_with_content "src/services/exampleService.js" \
"const exampleModel = require('../models/exampleModel');

exports.getExample = async () => {
    // Lógica para obter dados
    return exampleModel.find();
};

exports.createExample = async (data) => {
    // Lógica para criar dados
    return exampleModel.create(data);
};"

create_file_with_content "src/utils/helper.js" \
"// Funções utilitárias
module.exports = {
    exampleHelper: () => {
        // Lógica do helper
    }
};"

create_file_with_content "src/app.js" \
"const express = require('express');
const app = express();
const exampleRoutes = require('./routes/exampleRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/example', exampleRoutes);

module.exports = app;"

create_file_with_content "src/index.js" \
"require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(\`Servidor rodando na porta \${port}\`);
});"

chmod +x setup.sh

echo "Estrutura do projeto criada/atualizada com sucesso!"