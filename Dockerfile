FROM node:6.3.1
MAINTAINER Reddi2MingleMVP <christinejchou@gmail.com>

# Replace sh with bash so we can use source
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install project dependencies
RUN mkdir -p /usr/src/app
# RUN mkdir -p /usr/src/user-service
WORKDIR /usr/src/app

# Copy all files directory in host machine into location in container
COPY . /usr/src/app/

# Install Node and project dependencies
RUN npm install -gq nodemon \ 
  && npm install -qqq \
  && npm install -gq webpack \
  && npm install -gq mocha

# Expose port 80/81 (http) 
EXPOSE 80