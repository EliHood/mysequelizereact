FROM node:8.12.0
COPY . /home/app
WORKDIR /home/app
COPY package.json ./
RUN npm install bcrypt
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
