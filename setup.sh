#!/bin/bash

# Função para renomear arquivos se eles existirem
rename_file() {
  if [ -f "$1" ]; then
    mv "$1" "$2"
    echo "Arquivo $1 renomeado para $2"
  else
    echo "Arquivo $1 não encontrado"
  fi
}

# Renomear controladores
rename_file "src/controllers/exampleController.js" "src/controllers/userController.js"
rename_file "src/controllers/exampleController.js" "src/controllers/authController.js"

# Renomear middlewares
rename_file "src/middlewares/authMiddleware.js" "src/middlewares/authenticationMiddleware.js"

# Renomear modelos
rename_file "src/models/exampleModel.js" "src/models/userModel.js"

# Renomear rotas
rename_file "src/routes/exampleRoutes.js" "src/routes/userRoutes.js"
rename_file "src/routes/exampleRoutes.js" "src/routes/authRoutes.js"

# Renomear serviços
rename_file "src/services/exampleService.js" "src/services/userService.js"
rename_file "src/services/exampleService.js" "src/services/authService.js"

echo "Renomeação de arquivos concluída!"