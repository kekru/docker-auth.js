#!/bin/bash

docker plugin disable kekruauth
docker plugin rm kekruauth

docker build -t rootfsimage .
id=$(docker create rootfsimage true)
rm -Rf rootfs
mkdir -p rootfs
#exit 0
docker export "$id" | tar -x -C rootfs
docker rm -vf "$id"
#docker rmi -f rootfsimage

docker plugin create kekruauth .
docker plugin enable kekruauth