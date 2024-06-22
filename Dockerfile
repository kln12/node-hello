# Stage 1: Build the application
FROM node:14 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Stage 2: Create the production image
FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies and build output from build stage
COPY --from=build /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]
