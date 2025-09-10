FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Instalación de dependencias de desarrollo para prisma
RUN npm install

# Copiar archivos de prisma para generar cliente
COPY prisma ./prisma/

# Generar cliente de prisma
RUN npx prisma generate

# Copiar el resto del código
COPY . .

EXPOSE 3000

# El comando real se sobrescribe en docker-compose para desarrollo
CMD ["npm", "run", "start:prod"]
