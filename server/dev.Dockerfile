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

# Copy script file for waiting
COPY wait-for.sh /bin/wait-for

# Add access to execute "wait-for.sh"
RUN chmod a+x /bin/wait-for

# Run run run ...
CMD wait-for postgre_db:5432 && make db-dev-migrate-up && npm run start:dev:live
