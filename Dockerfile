FROM node:20-buster

# Add build dependencies for bcrypt
RUN apt-get update && apt-get install -y make gcc g++ python3 && ln -sf python3 /usr/bin/python

WORKDIR /src
COPY package*.json ./

RUN npm install
COPY . .

# Build the NestJS app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

# Remove build dependencies after install
RUN apt-get remove -y make gcc g++ python3 && apt-get autoremove -y && apt-get clean
