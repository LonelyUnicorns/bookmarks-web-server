FROM node:latest

WORKDIR /srv

ADD . ./srv

RUN npm install

CMD npm start
