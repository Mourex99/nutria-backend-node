#!/bin/bash

# Baixar o BFG Repo-Cleaner
echo "Baixando o BFG Repo-Cleaner..."
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar -O bfg.jar

# Navegar até o diretório do repositório
cd /c/Users/Mourex/Documents/programming - folders/nutria-backend-node || exit

# Usar o BFG para remover o arquivo sensível
echo "Removendo o arquivo sensível do histórico do Git..."
java -jar bfg.jar --delete-files 'src/config/nutria-fdfe7-firebase-adminsdk-wrr98-17f3cc57be.json'

# Limpar e compactar o repositório
echo "Limpando e compactando o repositório..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Fazer o push das mudanças para o repositório remoto
echo "Fazendo o push das mudanças para o repositório remoto..."
git push --force

echo "Processo concluído com sucesso."