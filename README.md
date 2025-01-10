# Nutr.IA Backend

Este é o backend para a aplicação Nutr.IA, desenvolvido em Node.js. Ele utiliza o Firebase Authentication para gerenciar a autenticação de usuários, incluindo registro, login e redefinição de senha.

## Funcionalidades

- **Registro de Usuário**: Criação de novos usuários com email e senha.
- **Login de Usuário**: Autenticação de usuários existentes.
- **Redefinição de Senha**: Envio de link para redefinição de senha por email.

## Endpoints

### Autenticação

- **POST /api/auth/login**: Login de usuário.

### Usuários

- **POST /api/users/register**: Registro de novo usuário.
- **PUT /api/users/profile**: Atualização do perfil do usuário.

### Redefinição de Senha

- **POST /api/password/request-reset**: Solicitação de link para redefinição de senha.

## Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/nutria-backend-node.git