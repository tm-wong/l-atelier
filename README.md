# *****************************************************

#     _Tennis Players - REST API_
# 
###     T. M. Wong - genaddress@gmail.com - T. 06 80 28 99 
####     Evaluation technique pour L'Atelier
####     Juin 2023
# 
# *****************************************************
Cette application est construite avec Fastify en node.js (v18.15.0) et PostgreSQL (v15.x)
- https://www.fastify.io
- https://www.postgresql.org

Une couche de sécurité y a été ajoutée avec Auth0 
Elle est déployée sur un node Heroku
- https://auth0.com
- https://www.heroku.com

La base URL de cette application est la suivante :
- https://vast-hamlet-90006-89b9091b2776.herokuapp.com

---
## Installation
```sh
mkdir postgres-data
git clone git@github.com:tm-wong/l-atelier.git
cd l-atelier
docker-compose up --build
```
---
## Test du service
```sh
curl -i 0.0.0.0:3000/health

> HTTP/1.1 200 OK
> vary: Origin
> access-control-allow-origin: *
> content-type: application/json; charset=utf-8
> content-length: 15
> Date: Tue, 20 Jun 2023 01:58:37 GMT
> Connection: keep-alive
> Keep-Alive: timeout=72
> 
> {"status":"OK"}
```
---
## Tests de l'application
```sh
docker exec -it app npm test
```
Un bon nombre d'indicateurs appraisent en rouge, la couverture de test n'atteignant pas les 100%
La couverture de test est cependant honorable, aux allentours de 75 à 80 pourcents
---
## Récupération d'un token d'accès
```sh
curl -i -X POST \
-H 'Content-Type: application/json' \
-H 'Accept: applicatoion/json' \
-d '{
"client_id": "CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym",
"client_secret": "xXxXxX",
"audience": "https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/",
"grant_type": "client_credentials"
}' \
https://dev-y1z3acypuoplop6h.us.auth0.com/oauth/token

> {
>     "access_token": "eyJhbGc............",
>     "expires_in": 86400,
>     "token_type": "Bearer"
> }
```
---
## Utilisation du token
```sh
export TOKEN='eyJhbGc............'

curl -i \
-H "Authorization: Bearer $TOKEN" \
https://vast-hamlet-90006-89b9091b2776.herokuapp.com/api/players
```
---
## Documentation de l'API
Une documentation sur les routes implémentées sur cette API est consultable à partir de l'URL suivante :
_https://vast-hamlet-90006-89b9091b2776.herokuapp.com/doc_

Celle-ci liste chacune des routes avec des exemples d'utilisation.

---
## Au sujet des routes
Je crois bien avoir compris que l'exercice qui consiste à citer, entre autre, le pays avec le plus grand ratio de parties gagnées n'adresse pas une demande de somme mais plutôt de ratio, c'est à dire de moyenne par joueur par pays.
Merci de bien vouloir confirmer.

###### Pour toute question ou besoin de précision, n'hésitez pas à prendre contact. Merci encore.


.



