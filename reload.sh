#!/bin/bash

doc rm app
doc rm l-atelier-ts-app
sudo chown -R theo: /home/theo/Documents/theo-perso/l-atelier/l-atelier-ts/postgres-data/data
docker-compose up --build

