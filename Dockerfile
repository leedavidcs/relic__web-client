# - Use 'node' official image, with the alpine 8.15.0 branch (latest at this time)
FROM node:8.15.0-alpine

# - This app listens on port 8080, but the container should launch on port port 80
  # so it will respond to http://localhost:80 on your computer
EXPOSE 8080

# - Then it should create directory /usr/src/app for app files  with 'mkdir -p /usr/src/app'
RUN mkdir -p /usr/src/app

# - Node uses a "package manager", so it needs to copy in the package(-lock).json files
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

# - Then, it needs to run 'npm-install' to install dependencies
RUN npm install

# Then, it needs to copy in all files form current directory
COPY . .

CMD ["npm", "run", "start"]
