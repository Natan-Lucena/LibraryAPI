# ==============================================================================
# ESTÁGIO 1: BUILD (Compilação e Instalação de Dependências)
# ==============================================================================
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de configuração de dependências
COPY package*.json ./
COPY .env ./

# Instala todas as dependências (incluindo devDependencies para compilação)
# O script 'yarn install' é usado conforme seu package.json
RUN yarn install

# Copia todo o código-fonte
COPY . .

# Constrói a aplicação (compila de TypeScript para JavaScript na pasta 'dist')
# O script 'build' está definido no seu package.json
RUN yarn run migrate:dev
RUN yarn run build

# ==============================================================================
# ESTÁGIO 2: PRODUCTION (Imagem Final)
# ==============================================================================
FROM node:20-alpine AS production

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas as dependências de produção (node_modules) do estágio de build
# Isso garante uma imagem final menor
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copia os artefatos de build (código JS compilado)
COPY --from=build /usr/src/app/dist ./dist

# Copia o package.json (necessário para rodar o 'start:prod')
COPY --from=build /usr/src/app/package.json .

# Você também pode precisar copiar o .env, dependendo de como você carrega variáveis:
# COPY --from=build /usr/src/app/.env .

# Expõe a porta padrão do NestJS
EXPOSE 3333

# Comando para iniciar a aplicação em modo de produção
# O script 'start:prod' está definido no seu package.json
CMD [ "yarn", "run", "start:prod" ]