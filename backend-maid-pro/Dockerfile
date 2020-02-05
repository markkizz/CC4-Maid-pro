FROM node:12.14

RUN mkdir -p /opt/app

RUN apt-get -q update && apt-get -qy install netcat
RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json .
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app
RUN chmod +x ./wait-for.sh
CMD sh -c './wait-for.sh mysql:3306 -- sequelize db:create && node index.js'

EXPOSE 8080

# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install && mv node_modules ../
# COPY . .
# EXPOSE 8080
# CMD npm start
