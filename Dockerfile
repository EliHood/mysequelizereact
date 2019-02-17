FROM node:8.10.0-alpine
EXPOSE 8000
COPY . /home/app
WORKDIR /home/app
COPY package.json ./
RUN npm install
CMD ["npm", "start"]