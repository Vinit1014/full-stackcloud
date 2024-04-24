# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory into the container
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run the backend server
CMD ["node", "index.js"]
