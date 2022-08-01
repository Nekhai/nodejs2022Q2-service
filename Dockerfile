FROM node:16.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY src ./src

COPY .env ./

COPY tsconfig.json ./

COPY tsconfig.build.json ./

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]
