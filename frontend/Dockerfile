FROM node:20.18-alpine AS builder
RUN mkdir /app
COPY . /app
RUN cd /app && npm install && npm run build
WORKDIR /app
CMD [ "node", "build/index.js" ]