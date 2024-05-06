# Stage 1: Build the React app
FROM node:latest

# Set the working directory
WORKDIR /usr/app/task_manager

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Build the React app
CMD npm run dev


