FROM node
WORKDIR /usr/app/api
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .