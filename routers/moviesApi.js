var express = require('express');
var router = express.Router();

const apiAdapter = require('./apiAdapter');
const isAuthorized = require('../controller/requestAuthenticator.js');

const BASE_URL = 'https://fis-ms-movies.herokuapp.com/api/v1';
const api = apiAdapter(BASE_URL);



/**
 * @swagger
 * components:
 *  schemas:
 *   MovieStatusItem:
 *     type: object
 *     required:
 *       - id_user
 *       - id_movie
 *       - status
 *     properties:
 *       _id:
 *         type: string
 *       id_user:
 *         type:string
 *       id_movie:
 *         type:string
 *       status:
 *         type: string           
 */

/**
 * paths:
 *  /movies_status:
 *    post:
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
    api.post(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 *  delete:
 *    summary: Borra todos los movie_status
 *    operationId: deleteMoviesStatus
 *    description: Borra todos los movie_status de todos los usuarios
 *    responses:
 *      '200':
 *        description: todos los movie_status borrado
 *      '500':
 *        description: Error del servidor
 */
router.delete('/movies_status', isAuthorized, (req, res) => {
    api.delete(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * paths:
 *  /movies_status/{_id}:
 *    parameters:
 *      - name: _id
 *        in: path
 *        required: true
 *        description: id de mongoDB del movie_status
 *        schema:
 *          type: string
 *    get:
 *      summary: Muestra un movie_status
 *      operationId: searchMoviesStatus
 *      description: Muestra el movie_status mediante el id de mongodb
 *      responses:
 *        '200':
 *          description: movie_status creado
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 *  put:
 *    summary: Modifica un movie_status
 *    operationId: updateMoviesStatus
 *    description: Modifica un movie_status mediante su id
 *    responses:
 *      '200':
 *        description: movie_status creado
 *      '404':
 *        description: movie_status no encontrado
 *      '500':
 *        description: Error del servidor
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MovieStatusItem'
 *      description: movie_status a modificar
 */
router.put('/movies_status/:_id', isAuthorized, (req, res) => {
    api.put(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 *  delete:
 *    summary: Borra un movie_status
 *    operationId: deleteMoviesStatus
 *    description: Borra el movie_status mediante su id
 *    responses:
 *      '200':
 *        description: Borra el movie_status
 *      '404':
 *        description: movie_status no encontrado
 *      '500':
 *        description: Error del servidor
 */
router.delete('/movies_status/:_id', isAuthorized, (req, res) => {
    api.delete(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * paths:
 *  /movies_status/{id_user}:
 *    parameters:
 *      - name: id_user
 *        in: path
 *        required: true
 *        description: id del usuario
 *        schema:
 *          type: string
 *    get:
 *      summary: Muestra los movie_status de un usuario
 *      operationId: searchMoviesStatusByUser
 *      description: Muestra el movie_status mediante el id de un usuario
 *      responses:
 *        '200':
 *          description: Se muestra los movie_status
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/user/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * paths:
 *  /movies_status/{id_user}/{id_movie}:
 *    parameters:
 *      - name: id_user
 *        in: path
 *        required: true
 *        description: id del usuario
 *        schema:
 *          type: string
 *    parameters:
 *      - name: id_movie
 *        in: path
 *        required: true
 *        description: id de la pelicula
 *        schema:
 *          type: string
 *    get:
 *      summary: Muestra los movie_status de un usuario
 *      operationId: searchMoviesStatusByUserAndMovie
 *      description: Muestra el movie_status mediante el id de un usuario y el id de la pelicula
 *      responses:
 *        '200':
 *          description: Se muestra los movie_status
 *        '404':
 *          description: movie_status no encontrado
 *        '500':
 *          description: Error del servidor
 */
router.get('/movies_status/user/:_id_user/:_id_movie', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});


/**
 * paths:
 *   /search_api
 *   parameters:
 *     -  name: query
 *        in: request
 *        required: true
 *        description: Palabras clave sobre la pelicula
 * 
 *    get:
 *      summary: Devuelve las peliculas titutadas con la query, o las que contengan en el nombre el contenido de la consulta
 *      operationId: searchMovies
 *      description: Muestra la información de las peliculas resultantes de la consulta
 *      responses:
 *        '200':
 *          description: Se muestra las peliculas
 *        '500':
 *          description: Error del servidor
 */
router.get('/search_api', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});

/**
 * paths:
 *   /search_api
 *   parameters:
 *     -  name: _id
 *        in: request
 *        required: true
 *        description: ID de la pelicula
 * 
 *    get:
 *      summary: Devuelve la pelicula que coincida con el id
 *      operationId: searchMovies
 *      description: Muestra la información de las pelicula
 *      responses:
 *        '200':
 *          description: Se muestra la pelicula
 *        '500':
 *          description: Error del servidor
 */
router.get('/search_api/:_id', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});

/**
 * paths:
 *   /search_api/discover
 *   parameters: Theres a lot in TMDB.
 *   get:
 *     summary: Devuelve la película que coincida con el id
 *     operationId: searchMovies
 *     description: Muestra la información de las película
 *     responses:
 *       '200':
 *         description: Se muestra la pelicula
 *       '500':
 *         description: Error del servidor
 */
router.get('/search_api/discover', isAuthorized, (req, res) => {
    api.get(req.path, req.body)
        .then(resp => {
            res.status(resp.status).send(resp.data);
        })
        .catch(error => {
            res.status(error.response.status).send({error : error.response.data.error});
        });
});

module.exports = router;

/**
 * openapi: 3.0.0
 * # Added by API Auto Mocking Plugin
 * servers:
 * # Added by API Auto Mocking Plugin
 *  - description: SwaggerHub API Auto Mocking
 *  url: https://virtserver.swaggerhub.com/MrManoloDG/fis-movieStatus/1.0.0
 *  - description: fis-movie_status
 *  url: https://fis-ms-movies.herokuapp.com/api/v1/movies_status
 * 
 * info:
 *  version: "1.0.0"
 *  title: Movie Status Api
 *  version: "1.0.0"
 *  contact:
 *    email: manueldiazgil96@hotmail.com
 *  license:
 *    name: Apache 2.0
 *    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
 */
