FROM node:latest

WORKDIR /usr/app/server

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD npm run start

