# NodeJS Version 16
FROM node:lts-alpine

WORKDIR /app

# Copy Dir
COPY package*.json ./

# Install Node Package
RUN npm install


# COPY package.json .
COPY  . . 


EXPOSE 4000

# Run tests (modify as needed)
# CMD ["npm", "test"]

# Cmd script
CMD ["npm", "run", "dev"]