# Image for node.js
FROM node:10

# Set directory for application
WORKDIR /app

# Copy "package.json"
COPY package.json .

# Install dependencies
RUN npm install

# Copy all file for application
COPY . .

# Run run run ...
CMD node /app/bin/www.js
