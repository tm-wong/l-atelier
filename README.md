###### ****************************************************************

#     _Tennis Players - REST API_
# 
###     T. M. Wong - Juin 2023
# 
###### ****************************************************************

Cette application est construite avec Fastify en node.js (v18.15.0) / TypeScript (v5.2.2) et PostgreSQL (v15.x)
- https://www.fastify.io
- https://www.postgresql.org

Une couche de sécurité y a été ajoutée avec Auth0 
Elle est déployée sur un node Heroku
- https://auth0.com
- https://www.heroku.com

La base URL de cette application est la suivante :
- https://vast-hamlet-90006-89b9091b2776.herokuapp.com


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

---
## Tests HTTP
Une collection de tests réalisés avec Postman (https://www.postman.com) est disponible et devrait vous être partagée par email.
Toutefois, un export JSON de cette même collection est présent dans le répertoire _/test/postman-collection/postman.json_ de ce dépôt.

Cest tests font autant la démonstration des situations qui fonctionnent que de celles présentant une erreur, ce pour s'assurer que la gestion d'erreur fonctionne correctement.

En outre, la route _/api/health_ permet de s'assurer que le service est fonctionnel et que l'accès ainsi que la lecture en base de données ne présentent aucune anomalie.

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
curl -i 0.0.0.0:7000/health

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

Un bon nombre d'indicateurs appraissent en rouge, la couverture de test n'atteignant pas les 100%. La couverture de test est cependant honorable, aux allentours de 75 à 80 %.

---
## Récupération d'un token d'accès
##### _*ATTENTION :  la re-génération du token rendra le token pécédent caduque.*_

Il conviendra donc de remplacer le nouveau token dans tous les tests, qu'il s'agissent des tests avec _tap (docker exec -it app npm test)_ dont il est question juste au-dessus ou bien des tests réalisés avec Postman, également au-dessus. 

Le token configuré actuellement est valable pour une période de 8 semaines.

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

HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
Vary: Origin
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1871
Date: Tue, 20 Jun 2023 17:35:28 GMT
Via: 1.1 vegur

[
    {
        "id": 17,
        "player": {
            "id": 17,
            "sex": "M",
            "data": {
                "age": 33,
                "last": [1, 0, 0, 0, 1 ],
                "rank": 1,
                "height": 185,
                "points": 1982,
                "weight": 85000
            },
            "country": {
                "code": "ESP",
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png"
            },
            "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
            "lastname": "Nadal",
            "firstname": "Rafael",
            "shortname": "R.NAD"
        }
    },
    {
        "id": 52,
        "player": {
            "id": 52,
            "sex": "M",
            "data": {
 ...
 ...
 ...
 
```

---

### Changelog

#### [0.0.4] - 2023-11-15

##### Changed

- Swithed entire repository to TypeScript



.



