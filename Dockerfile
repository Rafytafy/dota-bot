FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./

EXPOSE 8888

CMD ["node", "index.js"]