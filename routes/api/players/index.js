'use strict';

const PlayerService = require('../../../services/PlayerService');

/**
 * Routes de l'API Players
 */
// eslint-disable-next-line no-unused-vars
module.exports = async function(fastify, opts) {

    // Décalaration des utilitaires courants
    const { log, httpErrors } = fastify;
    const service = new PlayerService(fastify);

    // auth middleware
    fastify.addHook('preHandler', async(request, reply) => {
        const authorized = await fastify.auth(request, reply);
        if (!authorized) {
            throw httpErrors.unauthorized();
        }
    });




    /**
     * @apiDefine BadRequestError
     * @apiError (4xx) BadRequest 400
     * @apiErrorExample {json} 400 Bad Request
     * 
     *      HTTP/1.1 400 Bad Request
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 400,
     *        "message": "Bad Request"
     *      }
     */


    /**
     * @apiDefine UnauthorizedError
     * @apiError (4xx) Unauthorized 401
     * @apiErrorExample {json} 401 Unauthorized
     * 
     *      HTTP/1.1 401 Unauthorized
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 401,
     *        "message": "Unauthorized"
     *      }
     */


    /**
     * @apiDefine ForbiddenError
     * @apiError (4xx) Forbidden 403
     * @apiErrorExample {json} 403 Forbidden
     * 
     *      HTTP/1.1 403 Forbidden
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 403,
     *        "message": "Forbidden"
     *      }
     */


    /**
     * @apiDefine NotFoundError
     * @apiError (4xx) NotFound 404
     * @apiErrorExample {json} 404 Not Found
     * 
     *      HTTP/1.1 404 Not Found
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 404,
     *        "message": "Not Found"
     *      }
     */


    /**
     * @apiDefine MethodNotAlloedrror
     * @apiError (4xx) MethodNotAllowed 405
     * @apiErrorExample {json} 405 Method Not Allowed
     * 
     *      HTTP/1.1 405 Method Not Allowed
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 405,
     *        "message": "Method Not Allowed"
     *      }
     */

    /**
     * @apiDefine InternalServerError
     * @apiError (5xx) InternalServerError 500
     * @apiErrorExample {json} 500 Internal Server Error
     * 
     *      HTTP/1.1 500 Internal Server Error
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 147
     *      Date: Mon, 19 Jun 2023 17:22:14 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *        "status": 500,
     *        "message": "Internal Server Error"
     *      }
     */

    /**
     * @api {post} /api/players 1 - Récupération du token
     * @apiName GetToken
     * @apiGroup 1 - Token
     * @apiVersion 0.0.1
     * @apiDescription Retourne un token d'authorisation
     * 
     * @apiExample {curl} Exemple d'utilisation:
     * 
     *      curl -i -X POST \
     *      -H 'Content-Type: application/json' \
     *      -H 'Accept: applicatoion/json' \
     *      -d '{
     *        "client_id": "CZU7lzTAUmg5MGjr8QyPQJbHBuXsTUym",
     *        "client_secret": "Q0Hmu0y6QHM4uy2HZr4gPl6bEoH78RG3HxBbic2gbjauM8LrQI767dejQXqbm8So",
     *        "audience": "https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/",
     *        "grant_type": "client_credentials"
     *      }' \
     *      https://dev-y1z3acypuoplop6h.us.auth0.com/oauth/token
     * 
     *
     * @apiSuccessExample {json} 200 OK
     * 
     *      HTTP/2 200 
     *      date: Tue, 20 Jun 2023 00:07:23 GMT
     *      content-type: application/json
     *      cf-ray: 7d9fc5737d0b027e-CDG
     *      cf-cache-status: DYNAMIC
     *      cache-control: no-store
     *      ...
     * 
     * 
     *      {
     *        "access_token": "eyJhbGc............",
     *        "expires_in": 86400,
     *        "token_type": "Bearer"
     *      }
     * 
     *      Afin de faciliter l'utilisation de ce token,
     *      il peut être utile de le placer en variable d'environnement
     *      de sa console de la façon suivante: 
     *      export TOKEN='eyJhbGc............'
     *      puis, de l'utiliser en invoquant la variable correspondate :
     *      par exemple : echo $TOKEN
     *      ou bien dans les en-têtes HTTP : 
     *      curl -H 'Authorization: Bearer $TOKEN' etc.
     * 
     */


    /**
     * @api {get} /api/players 1 - Liste des joueurs
     * @apiName GetPlayer
     * @apiGroup 2 - Players
     * @apiVersion 0.0.1
     * @apiDescription Retourne la liste des players 
     * dans l'ordre de classement du meilleur joueur
     * 
     * @apiExample {curl} Exemple d'utilisation:
     *      export TOKEN='eyJhbGciOiJSUzI1NiIsIn ...'
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      0.0.0.0:3000/api/players
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      https://vast-hamlet-90006-89b9091b2776.herokuapp.com/api/players
     * 
     *
     * @apiSuccessExample {json} 200 OK
     * 
     *      HTTP/1.1 200 OK
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 1871
     *      Date: Mon, 19 Jun 2023 16:56:57 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      [
     *        {
     *          "id": 17,
     *          "player": {
     *            "id": 17,
     *            "sex": "M",
     *            "data": {
     *              "age": 33,
     *              "last": [1, 0, 0, 0, 1 ],
     *              "rank": 1,
     *              "height": 185,
     *              "points": 1982,
     *              "weight": 85000
     *            },
     *            "country": {
     *              "code": "ESP",
     *              "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png"
     *            },
     *            "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
     *            "lastname": "Nadal",
     *            "firstname": "Rafael",
     *            "shortname": "R.NAD"
     *          }
     *        },
     *        {
     *          "id": 52,
     *          "player": {
     *            "id": 52,
     *            "sex": "M",
     *            "data": {
     *              "age": 31,
     *              "last": [ 1, 1, 1, 1, 1 ],
     *              "rank": 2,
     *              "height": 188,
     *      ...
     *      ...
     *      ...
     * 
     * 
     * 
     * @apiUse BadRequestError
     * @apiUse UnauthorizedError
     * @apiUse ForbiddenError
     * @apiUse NotFoundError
     * @apiUse MethodNotAlloedrror
     * @apiUse InternalServerError
     * 
     */
    fastify.get('/', async function(request, reply) {

        try {

            // invocation du service
            return await service.get();

        } catch (err) {
            // relais de l'erreur
            log.error(err);
            throw err;
        }
    });


    /**
     * @api {get} /api/players/:id 2 - Joueur par ID
     * @apiName GetOnePlayer
     * @apiGroup 2 - Players
     * @apiVersion 0.0.1
     * @apiDescription Retourne le joueur que l'identifiant désigne
     * @apiParam {Number} id l'identifiant numérique *integer*
     * 
     * 
     * @apiExample {curl} Exemple d'utilisation:
     *      export TOKEN='eyJhbGciOiJSUzI1NiIsIn ...'
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      0.0.0.0:3000/api/players/17
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      https://vast-hamlet-90006-89b9091b2776.herokuapp.com/api/players/95
     * 
     *
     * @apiSuccessExample {json} 200 OK
     * 
     *      HTTP/1.1 200 OK
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 373
     *      Date: Mon, 19 Jun 2023 22:25:45 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *          "id": 17,
     *          "player": {
     *              "id": 17,
     *              "sex": "M",
     *              "data": {
     *                  "age": 33,
     *                  "last": [ 1, 0, 0, 0, 1 ],
     *                  "rank": 1,
     *                  "height": 185,
     *                  "points": 1982,
     *                  "weight": 85000
     *              },
     *              "country": {
     *                  "code": "ESP",
     *                  "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png"
     *              },
     *              "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
     *              "lastname": "Nadal",
     *              "firstname": "Rafael",
     *              "shortname": "R.NAD"
     *          }
     *      }
     * 
     * 
     * @apiUse BadRequestError
     * @apiUse UnauthorizedError
     * @apiUse ForbiddenError
     * @apiUse NotFoundError
     * @apiUse MethodNotAlloedrror
     * @apiUse InternalServerError
     * 
     */
    fastify.get('/:id', async function(request, reply) {

        try {

            // param id
            const { id } = request.params;

            // verification
            if (!id || !/^\d+$/.test(id.toString()))
                throw httpErrors.badRequest();

            // invocation du service
            return await service.getOne(id);

        } catch (err) {
            // relais de l'erreur
            log.error(err);
            throw err;
        }
    });

    /**
     * @api {get} /api/players/kpis 3 - Indicateurs clés sur les joueurs
     * @apiName GetPlayerKpis
     * @apiGroup 2 - Players
     * @apiVersion 0.0.1
     * @apiDescription Retourne les indicateurs clés sur la liste des joueurs
     * 
     * @apiExample {curl} Exemple d'utilisation:
     *      export TOKEN='eyJhbGciOiJSUzI1NiIsIn ...'
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      0.0.0.0:3000/api/players/kpis
     * 
     *      curl -i \
     *      -H "Authorization: Bearer $TOKEN" \
     *      https://vast-hamlet-90006-89b9091b2776.herokuapp.com/api/players/kpis
     * 
     *
     * @apiSuccessExample {json} 200 OK
     * 
     *      HTTP/1.1 200 OK
     *      vary: Origin
     *      access-control-allow-origin: *
     *      content-type: application/json; charset=utf-8
     *      content-length: 483
     *      Date: Mon, 19 Jun 2023 22:49:54 GMT
     *      Connection: keep-alive
     *      Keep-Alive: timeout=72
     * 
     *      {
     *          "kpis": {
     *              "maxPointRatioPerCountry": {
     *                  "country": "SRB",
     *                  "points": 2542
     *              },
     *              "medianBodyHeight": 185,
     *              "imcs": [
     *                  {
     *                      "id": 52,
     *                      "imc": 22.634676324128566,
     *                      "lastname": "Djokovic",
     *                      "firstname": "Novak"
     *                  },
     *                  {
     *                      "id": 95,
     *                      "imc": 21.62162162162162,
     *                      "lastname": "Williams",
     *                      "firstname": "Venus"
     *                  },
     *                  {
     *                      "id": 65,
     *                      "imc": 24.187046492878256,
     *                      "lastname": "Wawrinka",
     *                      "firstname": "Stan"
     *                  },
     *                  {
     *                      "id": 102,
     *                      "imc": 23.510204081632654,
     *                      "lastname": "Williams",
     *                      "firstname": "Serena"
     *                  },
     *                  {
     *                      "id": 17,
     *                      "imc": 24.835646457268076,
     *                      "lastname": "Nadal",
     *                      "firstname": "Rafael"
     *                  }
     *              ]
     *          }
     *      }
     * 
     * 
     * @apiUse BadRequestError
     * @apiUse UnauthorizedError
     * @apiUse ForbiddenError
     * @apiUse NotFoundError
     * @apiUse MethodNotAlloedrror
     * @apiUse InternalServerError
     * 
     */
    fastify.get('/kpis', async function(request, reply) {

        try {
            return await service.kpis();
        } catch (err) {
            log.error(err);
            throw err;
        }
    });
};
