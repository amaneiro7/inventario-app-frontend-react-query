# --- Etapa 1: Build ---
# Usamos la imagen oficial de Bun. Especificar versión :1 es más seguro que :latest
FROM oven/bun:1 AS builder

WORKDIR /app

# Copiamos solo los archivos de dependencias para aprovechar el cache de Docker
COPY package.json bun.lockb ./

# Instalamos dependencias. --frozen-lockfile asegura que se use el lockfile exacto.
RUN bun install --frozen-lockfile

# Copiamos el resto del código fuente de la aplicación
COPY . .

# Construimos la aplicación para producción. Vite leerá automáticamente .env.production aquí.
RUN bun run build

# --- Etapa 2: Runner (Imagen Final) ---
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos los archivos construidos desde la etapa 'builder' al directorio web de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos nuestra configuración personalizada de Nginx para soportar React Router
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Exponemos el puerto 80, que Nginx usa por defecto
EXPOSE 80
