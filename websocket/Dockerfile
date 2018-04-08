FROM node:9-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["node", "index.js"]
EXPOSE 9999
