# Usa una imagen base de Node
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

COPY . .

RUN npm install -g pnpm@9.5.0

# Instala las dependencias usando pnpm
RUN pnpm install

# Construye el proyecto Next.js
RUN pnpm run build

# Exponemos el puerto en el que Next.js correrá
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["pnpm", "dev"]
