FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 4000 5173

CMD ["npm", "run", "start:server"]
