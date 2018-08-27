FROM node
WORKDIR /code
COPY package*.json /code/

RUN npm install -g nodemon
RUN npm install

COPY . /code/
ENV DEBUG=outlank:*
CMD ["npm", "start"]
