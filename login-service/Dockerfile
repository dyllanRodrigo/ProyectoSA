FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env ./

COPY . .

EXPOSE 3003

CMD ["node", "index.js"]
