# Use a imagem base Node 20 Alpine
FROM node:20-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração do Yarn e pacotes para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install --frozen-lockfile

# Copie o restante do código do aplicativo para o contêiner
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar as migrações do Prisma e depois iniciar a aplicação
CMD npx prisma migrate deploy && npm run dev