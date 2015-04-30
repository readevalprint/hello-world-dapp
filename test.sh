#!/bin/sh

# CircleCI throws an error when we try to remove a container so don't set this.
# set -o errexit

# CircleCI doesn't support 'docker exec'.
if [ -n "$CI" ]; then
  docker_exec() {
    sudo lxc-attach -n $(docker-compose ps -q $1) -- bash -c "HOME=/root $2"
  }
else
  docker_exec() {
    docker exec $(docker-compose ps -q $1) $2
  }
fi

# Start up IPFS so we can load the source code into it.
docker-compose up -d ipfs

# Tell NPM to install modules.
docker-compose run --rm npm

echo Waiting for the IPFS daemon to be ready.

while ! docker_exec ipfs "/usr/bin/curl --silent localhost:5001"; do
  sleep 1
done

echo Adding source code to IPFS.

export SOURCE=$(docker_exec ipfs "/go/bin/ipfs add -recursive -quiet /usr/src/app" \
  | tail -n -1 | tr -d '\r')

echo Loaded source code into IPFS at $SOURCE.

docker-compose up -d seleniumnode
docker-compose run helloworldtest
