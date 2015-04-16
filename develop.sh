#!/bin/sh

docker-compose --file compose-dev.yml up -d seleniumnode
docker-compose --file compose-dev.yml up --no-recreate -d helloworldtest
docker-compose logs seleniumnode
