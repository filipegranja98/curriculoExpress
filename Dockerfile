# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do npm
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta 3000 para fora do contêiner
EXPOSE 3000

# Defina o comando para executar o aplicativo quando o contêiner for iniciado
CMD ["npm", "start"]
