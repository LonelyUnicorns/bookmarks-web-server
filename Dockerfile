FROM node:latest

WORKDIR /srv

ADD ./srv
ADD ./config.js /srv

RUN npm install

CMD npm start
