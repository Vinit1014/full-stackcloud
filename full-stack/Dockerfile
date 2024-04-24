# Use Node.js 18 as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Start a new stage for the production image
FROM node:18 AS production

# Set the working directory in the container
WORKDIR /app

# Copy only the built artifacts from the previous stage
COPY --from=build /app/dist ./build

# Install serve to run the production build
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the production build
CMD ["serve", "-s", "build"]

