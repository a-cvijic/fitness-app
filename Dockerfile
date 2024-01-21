# Stage 1: Build the frontend
FROM node:14 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to the working directory from the root
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code from the src directory and the public directory
COPY src ./src
COPY public ./public

# Build the frontend
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM --platform=linux/amd64 nginx:alpine

# Copy the built frontend files into the Nginx web server's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Ensure that the entrypoint script is executable
RUN chmod +x /docker-entrypoint.sh


# Expose port 80 (default for HTTP)
EXPOSE 80

# Define the command to start Nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

