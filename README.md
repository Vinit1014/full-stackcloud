Vinit Prajapati


1. Project Download:
   - Download a project containing both frontend and backend code with a MySQL database. For example, a project with a simple form frontend, a Nodejs backend, and MySQL database.

2. Making Dockerfile: 
   - Write Dockerfiles for frontend, backend, and database.

     <h1>Frontend Dockerfile:</h1>
     <p>
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
     </p>


<h1>Backend Dockerfile:</h1>

<p>
   
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
</p>

<h1>docker-compose.yaml:</h1>

<p>
   
version: '3'

services:
  frontend:
    build:
      context: ./full-stack  # Path to the directory containing frontend Dockerfile
      dockerfile: Dockerfile
    ports:
      - "5173:3000"  # Map container port 80 to host port 3000
    networks:
      - mynetwork

  backend:
    build:
      context: ./server  # Path to the directory containing backend Dockerfile
      dockerfile: Dockerfile
    ports:
      - "8080:8000"  # Map container port 8000 to host port 8000
    depends_on:
      - db  # Assuming you have a MySQL database service named 'db'
    networks:
      - mynetwork

  db:
    image: mysql:latest
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "password"
      MYSQL_DATABASE: "fullstackcloud"
    ports:
      - "3306:3306"  # Map container port 3306 to host port 3306
    networks:
      - mynetwork

networks:
  mynetwork:


   - Each Dockerfile should define the necessary environment and dependencies for the respective component.
   - Ensure that the Dockerfiles correctly set up the container environment for running the frontend, backend, and database components.

</p>
3. DockerHub Repository:
   - Create a new repository on Docker Hub where you will push your Docker images.
   
   - Log in to Docker Hub if you haven't already.

   ![Screenshot 2024-04-24 101300](https://github.com/Vinit1014/Vinit1014.github.io/assets/100791366/ce2aaf5a-6e03-416f-b372-12498b9ddcc4)

4. Creating Images and Containers:
   - Build the Docker images for frontend, backend, and database:
     
     docker build -t username/Reponame .
     ![Screenshot 2024-04-24 013858](https://github.com/Vinit1014/Vinit1014.github.io/assets/100791366/c1e10a54-b85f-4960-92ce-668c39986282)

     Replace username with your Docker Hub username and Reponame with the name of your repository.
   - Use Docker Compose to bring up the containers:
     
     docker-compose up
    

5. Log in to Docker Hub:
   - Log in to Docker Hub using the following command:
     
     docker login
    
   - Enter your Docker Hub username and password when prompted.

6. Push the Images and Containers:
   - Push your Docker images to Docker Hub using the following command:
   
     docker push vinits1014992/cloudia2:tagname
    
     Replace username with your Docker Hub username and Reponame with the name of your repository.

By following these steps, you should be able to build Docker images for your frontend, backend, and database components, run them as containers, and then push them to Docker Hub for deployment or sharing. Make sure to replace placeholder values like username and Reponame with your actual Docker Hub username and repository name.
