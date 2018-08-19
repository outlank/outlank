FROM node
WORKDIR /code
COPY package.json /code/package.json
RUN npm install && npm ls
# RUN mv /code/node_modules /node_modules
COPY . /code
ENV DEBUG=outlank:*
CMD ["npm", "start"]
