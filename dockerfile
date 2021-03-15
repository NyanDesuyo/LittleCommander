FROM node:15.11.0-buster

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "prod" ]
