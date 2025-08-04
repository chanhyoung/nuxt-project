# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies for the build process
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Nuxt application
RUN npm run build

# Stage 2: Create the production-ready image
FROM node:20-alpine

# Create a non-root user and group for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Set the working directory
WORKDIR /app

# Copy built assets and necessary files from the builder stage
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./
COPY --from=builder --chown=nuxtjs:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to the non-root user
USER nuxtjs

# Expose the application port
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# The command to run the application
CMD ["node", "server/index.mjs"]
