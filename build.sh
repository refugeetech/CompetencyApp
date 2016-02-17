#!/bin/sh

# make sure you do docker login first...

docker build -t competency-app .
docker tag -f competency-app iteamoperations/competency-app
docker push iteamoperations/competency-app
