FROM node:18.15.0-slim as frontend
RUN apt-get update && apt-get install -y default-jdk
WORKDIR /srv
COPY ./package*.json ./
RUN npm ci
COPY ./contracts/swapi.json ./
COPY ./ ./
RUN node ./contracts/generate-api.js ./swapi.json
