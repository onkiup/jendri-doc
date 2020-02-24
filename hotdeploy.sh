
#! /bin/bash

docker rm --force jendri
docker build . -t jendri
docker run --name jendri -d -p 9090:80 -v "$(pwd)"/www:/usr/share/nginx/html jendri
