#!/bin/sh

docker build -t reftec-app .
docker tag -f reftec-app tutum.co/iteamdev/reftec-app
docker push tutum.co/iteamdev/reftec-app
