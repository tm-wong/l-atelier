#!/bin/bash

docker container rm app
docker image rm l-atelier-ts-app
sudo chown -R theo: /home/theo/Documents/theo-perso/l-atelier/l-atelier-ts/postgres-data/data
docker-compose up --build

