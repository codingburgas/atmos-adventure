FROM node:latest

WORKDIR /atmos-server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE $PORT

CMD ["npm", "run", "dev"]