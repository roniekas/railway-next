# Stage 1: Install dependencies and build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Run Prisma generate to create the Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app in production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./.prisma

# Set environment variable to production
ENV NODE_ENV=production

# Run Prisma migrations before starting the app
CMD ["npx", "prisma", "migrate", "deploy"] && npm start

# Expose port
EXPOSE 3000
