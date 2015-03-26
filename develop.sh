#!/bin/sh

docker-compose --file compose-dev.yml up -d seleniumnode

cd test
  npm install
cd ..

docker-compose --file compose-dev.yml up --no-recreate -d helloworldtest
