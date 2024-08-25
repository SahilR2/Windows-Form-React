# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Create the distroless image
FROM gcr.io/distroless/static

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/build /app

# Serve the application using a simple HTTP server (e.g., serve)
# Note: This requires adding the HTTP server binary to the distroless image
# or using an alternative minimal server image.
CMD ["npx", "serve", "-s", "/app"]
