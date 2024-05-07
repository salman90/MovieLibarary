# NodeJS Version 16
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# Install Node Package
RUN npm install

# Copy Dir
COPY  . . 

EXPOSE 3000

# Cmd script
CMD ["npm", "start"]