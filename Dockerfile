# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["node", "server.js"]

