FROM node:6.3.1
MAINTAINER Reddi2MingleMVP <christinejchou@gmail.com>

# Replace sh with bash so we can use source
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install project dependencies
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json

# Install Node and project dependencies
RUN npm install -g nodemon \ 
  && npm install \
  && npm install -g webpack \
  && npm install -g mocha

# Expose port 80 (http) 
EXPOSE 80