# Use the official Node.js image as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run your app
CMD ["yarn", "dev"]
