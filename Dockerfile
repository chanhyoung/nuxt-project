# Stage 1: Build the Nuxt.js application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# This command builds the app, creating the .output directory
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy the built application from the 'builder' stage
COPY --from=builder /app/.output ./.output

# Copy production node_modules
COPY --from=builder /app/node_modules ./node_modules

# Copy the Nginx configuration and the startup script
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]