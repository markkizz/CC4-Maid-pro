FROM node:12.14

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]
