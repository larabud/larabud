# Stage 1: Build the application
FROM node:20 as builder
WORKDIR /app

# Copy only the relevant files
COPY package.json package-lock.json ./
COPY apps/api ./apps/api
COPY tsconfig*.json ./
COPY turbo.json ./

# Install dependencies and build the application
RUN npm install
RUN npm run build --workspace=api

# Stage 2: Create a lightweight image for production
FROM node:20-slim
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/apps/api/dist ./dist
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/main"]
