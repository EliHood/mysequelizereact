FROM node:8.12.0
COPY . /home/app
WORKDIR /home/app
COPY package.json ./
RUN npm install react-scripts@2.1.3
RUN npm install
EXPOSE 8001
CMD ["npm", "start"]
