# --- Etapa 1: Build ---
# Usamos una imagen de Node para instalar dependencias y construir el proyecto
FROM node:20-alpine3.20 AS builder

WORKDIR /app

# Instalamos pnpm de forma nativa con Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiamos solo los archivos de dependencias para aprovechar el cache de Docker
COPY package.json pnpm-lock.yaml ./

# Instalamos dependencias. --frozen-lockfile es más seguro y rápido para CI/Docker.
# El fallback `|| pnpm install` es una red de seguridad si el lockfile no está sincronizado.
RUN pnpm install --frozen-lockfile || pnpm install

# Copiamos el resto del código fuente de la aplicación
COPY . .

# Construimos la aplicación para producción. Vite leerá automáticamente .env.production aquí.
RUN pnpm run build

# --- Etapa 2: Runner (Imagen Final) ---
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos los archivos construidos desde la etapa 'builder' al directorio web de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos nuestra configuración personalizada de Nginx para soportar React Router
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Exponemos el puerto 80, que Nginx usa por defecto
EXPOSE 80
