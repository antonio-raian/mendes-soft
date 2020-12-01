FROM node:latest
LABEL maintainer="Antonio Raian"

ENV TZ=America/Bahia

WORKDIR /home/backend

COPY ./mendes-soft-api .

RUN yarn install && npm i -g @adonisjs/core
RUN yarn add @adonisjs/lucid@alpha && node ace invoke @adonisjs/lucid
RUN yarn add @adonisjs/auth@alpha 

EXPOSE 3333

CMD ["yarn", "start"]
