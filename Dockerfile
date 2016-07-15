FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY ./app/public /usr/src/app
EXPOSE 8080
CMD [ "npm", "start"]
