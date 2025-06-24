FROM node:20

WORKDIR /app

EXPOSE 5173

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm i

CMD ["npm", "run", "dev"]