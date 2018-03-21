FROM node:alpine as build
WORKDIR /app
ADD package.json /app
RUN npm install
ADD . /app
CMD "npm run build"

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
