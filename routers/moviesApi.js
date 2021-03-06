var express = require('express');
var router = express.Router();

const apiAdapter = require('./apiAdapter');
const isAuthorized = require('../controller/requestAuthenticator.js');

const BASE_URL = 'https://fis-ms-movies.herokuapp.com/api/v1';
const request = apiAdapter(BASE_URL, "MOVIES");



/**
 * @swagger
 * components:
 *   schemas:
 *     MovieStatusItem:
 *       type: object
 *       required:
 *         - id_user
 *         - id_movie
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *         id_user:
 *           type:string
 *         id_movie:
 *           type:string
 *         status:
 *           type: string           
 */

/**
 * @swagger
 * paths:
 *  /movies_status:
 *    post:
 *      tags:
 *       - Status
 *      summary: Añade un movie_status
 *      operationId: addMoviesStatus
 *      description: Añade un movie_status
 *      responses:
 *        '201':
 *          description: movie_status creado
 *        '500':
 *          description: Error del servidor
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieStatusItem'
 *        description: movie_status a añadir
 */
router.post('/movies_status', isAuthorized, (req, res) => {
    request(req.path, getConfig(req, "POST"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * @swagger
 * paths:
 *  /movies_status:
 *    delete:
 *      tags:
 *       - Status
 *      summary: Borra todos los movie_status
 *      operationId: deleteMoviesStatus
 *      description: Borra todos los movie_status de todos los usuarios
 *      responses:
 *        '200':
 *          description: todos los movie_status borrado
 *        '500':
 *          description: Error del servidor
 */
router.delete('/movies_status', isAuthorized, (req, res) => {
    request(req.path, getConfig(req, "DELETE"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * @swagger
 * paths:
 *  /movies_status/{_id}:
 *    get:
 *      tags:
 *       - Status
 *      summary: Muestra un movie_status
 *      operationId: searchMoviesStatus
 *      description: Muestra el movie_status mediante el id de mongodb
 *      parameters:
 *        - name: _id
 *          in: path
 *          required: true
 *          description: id de mongoDB del movie_status
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: movie_status creado
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/:_id', isAuthorized, (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            if(!error.response.data.error){
                res.send(error.message)
            } else {
                res.status(error.response.status).send({error : error.response.data.error})
            }
        })
});


/**
 * @swagger
 * paths:
 *  /movies_status/{_id}:
 *    put:
 *      tags:
 *       - Status
 *      summary: Modifica un movie_status
 *      operationId: updateMoviesStatus
 *      description: Modifica un movie_status mediante su id
 *      parameters:
 *        - name: _id
 *          in: path
 *          required: true
 *          description: id de mongoDB del movie_status
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: movie_status creado
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieStatusItem'
 *        description: movie_status a modificar
 */
router.put('/movies_status/:_id', isAuthorized, (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "PUT"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * @swagger
 * paths:
 *  /movies_status/{_id}:
 *    delete:
 *      tags:
 *       - Status
 *      summary: Borra un movie_status
 *      operationId: deleteMoviesStatus
 *      description: Borra el movie_status mediante su id
 *      parameters:
 *        - name: _id
 *          in: path
 *          required: true
 *          description: id de mongoDB del movie_status
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Borra el movie_status
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.delete('/movies_status/:_id', isAuthorized, (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "DELETE"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * @swagger
 * paths:
 *  /movies_status/{id_user}:
 *    get:
 *      tags:
 *       - Status
 *      summary: Muestra los movie_status de un usuario
 *      operationId: searchMoviesStatusByUser
 *      description: Muestra el movie_status mediante el id de un usuario
 *      parameters:
 *        - name: id_user
 *          in: path
 *          required: true
 *          description: id del usuario
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Se muestra los movie_status
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/user/:_id', isAuthorized, (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            if(!error.response.data.error){
                res.send(error.message)
            } else {
                res.status(error.response.status).send({error : error.response.data.error})
            }
        })
});


/**
 * @swagger
 * paths:
 *  /movies_status/{id_user}/{id_movie}:
 *    get:
 *      tags:
 *       - Status
 *      summary: Muestra los movie_status de un usuario
 *      operationId: searchMoviesStatusByUserAndMovie
 *      description: Muestra el movie_status mediante el id de un usuario y el id de la pelicula
 *      parameters:
 *        - name: id_user
 *          in: path
 *          required: true
 *          description: id del usuario
 *          schema:
 *            type: string
 *        - name: id_movie
 *          in: path
 *          required: true
 *          description: id de la pelicula
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Se muestra los movie_status
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/:_id_user/:_id_movie', isAuthorized, (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * @swagger
 * paths:
 *  /search_api:
 *    get:
 *      tags:
 *       - Search
 *      summary: 'Devuelve las peliculas titutadas con la query, o las que contengan en el nombre el contenido de la consulta'
 *      operationId: searchMoviesWithQuery
 *      description: Muestra la información de las peliculas resultantes de la consulta
 *      parameters:
 *        - name: query
 *          in: request
 *          required: true
 *          description: Palabras clave sobre la pelicula
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Se muestra las peliculas
 *        '500':
 *          description: Error del servidor
 */
router.get('/search_api', (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});

/**
 * @swagger
 * paths:
 *  /search_api/{_id}:
 *    get:
 *      tags:
 *       - Search
 *      summary: 'Devuelve las peliculas que coinciden con el id'
 *      operationId: searchMoviesWithId
 *      description: Muestra la información de las peliculas resultantes de la consulta
 *      parameters:
 *        - name: _id
 *          in: request
 *          required: true
 *          description: ID de la pelicula
 *      responses:
 *        '200':
 *          description: Se muestra las peliculas
 *        '500':
 *          description: Error del servidor
 */
router.get('/search_api/:_id', (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});

/**
 * @swagger
 * paths:
 *   /search_api/discover:
 *     get:
 *       tags:
 *       - Search
 *       summary: Devuelve la película que coincida con el id
 *       operationId: searchMovies
 *       description: Muestra la información de la película
 *       parameters:
 *        - name: _id
 *          in: request
 *          required: false
 *          description: ID de la pelicula
 *       responses:
 *         '200':
 *           description: Se muestra la pelicula
 *         '500':
 *           description: Error del servidor
 */
router.get('/search_api/discover', (req, res) => {
    request(req._parsedUrl.path, getConfig(req, "GET"))
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


function getConfig(req, method = "GET") {
    var config = {};
    config.method = method;
    if(req.headers['authorization'])
      config.headers = { Authorization: req.headers['authorization'] }
    if(req.body)
      config.data = req.body;  
    return config;
  }

module.exports = router;
