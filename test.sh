#!/bin/sh

set -o errexit

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

echo Waiting for IPFS daemon to be ready.

while ! docker_exec ipfs "/usr/bin/curl localhost:5001"; do
  sleep 1
done

# Tar the files because IPFS doesn't yet support symbolic links.
cd source
  tar --create --file=../source.tar --exclude-from=.gitignore *
cd ..

export SOURCE=$(docker_exec ipfs "/go/bin/ipfs add -quiet /srv/source.tar" \
  | tail -n -1 | tr -d '\r')

echo Loaded source code into IPFS at $SOURCE.

docker-compose up -d seleniumnode

cd test
  npm install
cd ..

docker-compose run helloworldtest
