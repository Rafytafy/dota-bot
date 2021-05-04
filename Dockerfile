FROM node:15
WORKDIR /app
COPY package.json .
RUN apt-get update && apt-get upgrade -y 
RUN npm install
COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]