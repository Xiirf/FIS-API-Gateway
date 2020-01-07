var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator.js')

const BASE_URL = 'https://recomendador-fis1920.herokuapp.com/recomendador/v1'
const api = apiAdapter(BASE_URL)

/**
 * @swagger
 *  components:
 *    schemas:
 *      pelicula:
 *        allOf:
 *        - type: object
 *          properties:
 *            original_title:
 *              type: string
 *            id:
 *              type: integer
 *            video:
 *              type: boolean
 *            title:
 *              type: string
 *            vote_count:
 *              type: integer
 *            vote_average:
 *              type: number
 *            release_date:
 *              type: string
 *            poster_path:
 *              type: string
 *            genre_ids:
 *              type: array
 *              items:
 *                type: integer
 *            original_language:
 *              type: string
 *            backdrop_path:
 *              type: string
 *            adult:
 *              type: boolean
 *            overview:
 *              type: string
 *            origin_country:
 *              type: array
 *              items:
 *                type: string
 *            popularity:
 *                type: number
 *      serie:
 *        allOf:
 *        - type: object
 *          properties:
 *            original_name:
 *              type: string
 *            id:
 *              type: integer
 *            name:
 *              type: string
 *            vote_count:
 *              type: integer
 *            vote_average:
 *              type: number
 *            first_air_date:
 *              type: string
 *            poster_path:
 *              type: string
 *            genre_ids:
 *              type: array
 *              items:
 *                type: integer
 *            original_language:
 *              type: string
 *            backdrop_path:
 *              type: string
 *            overview:
 *              type: string
 *            origin_country:
 *              type: array
 *              items:
 *                type: string
 *            popularity:
 *                type: number
 *      listaNegra:
 *        allOf:
 *        - type: object
 *          properties:
 *            idTmdb:
 *              type: integer
 *            idUsuario:
 *              type: string
 */

/**
 * @swagger
 * path:
 *  '/aleatorio/peliculas':
 *    get:
 *      tags:
 *        - aleatorio
 *      description: >-
 *        Recomendador que devuelva aleatoriamente una lista de <number> peliculas (las que tienen buena puntuacion)
 *      operationId: getAleatorioPeliculas
 *      parameters:
 *        - name: number
 *          in: query
 *          description: 'nombre de peliculas que recomendar (optional, 20 por defecto). Si se recommando menos de 1, se devuelve una lista vacía'
 *          required: false
 *          schema:
 *            minimum: 1
 *            type: integer
 *            format: int64
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                - type: object
 *                  properties:
 *                    results:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/pelicula'
 *        '401':
 *           description: Unauthorized
 *           content:
 *             text/html:
 *               schema:
 *                 type: string
 *                 format: base64
 *                 default: 'Unauthorized: No correct token provided'
 *        '500':
 *             description: Internal server error
 *             content: {}
 *      security:
 *        - bearerAuth:
 *          - read
 */
router.get('/aleatorio/peliculas', isAuthorized, (req, res) => {
    api.get(req._parsedUrl.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message + '\n' + error.response.data.error)
  })
})

/**
 * @swagger
 * path:
 *   '/aleatorio/series':
 *      get:
 *        tags:
 *          - aleatorio
 *        description: >-
 *          Recomendador que devuelva aleatoriamente una lista de <number> series (las que tienen buena puntuacion)
 *        operationId: getAleatorioSeries
 *        parameters:
 *          - name: number
 *            in: query
 *            description: 'nombre de series que recomendar (optional, 20 por defecto). Si se recommando menos de 1, se devuelve una lista vacía'
 *            required: false
 *            schema:
 *              type: integer
 *              format: int64
 *        responses:
 *          '200':
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  allOf:
 *                  - type: object
 *                    properties:
 *                      results:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/serie'
 *          '401':
 *             description: Unauthorized
 *             content:
 *               text/html:
 *                 schema:
 *                   type: string
 *                   format: base64
 *                   default: 'Unauthorized: No correct token provided'
 *          '500':
 *             description: Internal server error
 *             content: {}
 *      security:
 *        - bearerAuth:
 *          - read
 */
router.get('/aleatorio/series', isAuthorized, (req, res) => {
  api.get(req._parsedUrl.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message + '\n' + error.response.data.error)
  })
})

/**
 * @swagger
 * path:
 *  '/porSimilitudes/pelicula/{filmId}':
 *     get:
 *       tags:
 *         - similitudes
 *       description: >-
 *         Recomendador que devuelve una lista de hasta <number> películas de similares
 *         categorías que otros usuarios han puntuado sobre la película puntuada.
 *         La eleccion de estas peliculas se hace comparando las puntuaciones del
 *         usuario autentificado con las de los otos usuarios.
 *       operationId: getPeliculasPorSimilitudes
 *       parameters:
 *         - name: filmId
 *           in: path
 *           description: id de la pelicula puntuada
 *           required: true
 *           schema:
 *             type: string
 *         - name: number
 *           in: query
 *           description: 'nombre de peliculas que recomendar (optional, 5 por defecto). Si se recommando menos de 1, se devuelve una lista vacía'
 *           required: false
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                 - type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/pelicula'
 *         '401':
 *           description: Unauthorized
 *           content:
 *             text/html:
 *               schema:
 *                 type: string
 *                 format: base64
 *                 default: 'Unauthorized: No correct token provided'
 *         '412':
 *           description: 'Precondition Failed (El id de la pelicula es incorrecta)'
 *           content: {}
 *         '417':
 *           description: 'Expectation Failed (El usuario no ha puntado la pelicula. Devuelve unicamente peliculas similares segun tmdb sin tener cuenta del usuario y sin hacer ningun proceso particular)'
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                 - type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/pelicula'
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.get('/porSimilitudes/pelicula/:filmId', isAuthorized, (req, res) => {
  api.get(req._parsedUrl.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(error.response.status == 417)
      res.send(error.response.data)
    else
      res.send(error.message + '\n' + error.response.data.error)
  })
})

/**
 * @swagger
 * path:
 *  '/porSimilitudes/serie/{serieId}':
 *     get:
 *       tags:
 *         - similitudes
 *       description: >-
 *         Recomendador que devuelve una lista de hasta <number> series de similares categorías
 *         que otros usuarios han puntuado sobre la película puntuada. La eleccion
 *         de estas series se hace comparando las puntuaciones del usuario
 *         autentificado con las de los otos usuarios.
 *       operationId: getSeriesPorSimilitudes
 *       parameters:
 *         - name: serieId
 *           in: path
 *           description: id de la serie puntuada
 *           required: true
 *           schema:
 *             type: string
 *         - name: number
 *           in: query
 *           description: 'nombre de series que recomendar (optional, 5 por defecto). Si se recommando menos de 1, se devuelve una lista vacía'
 *           required: false
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                 - type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/serie'
 *         '401':
 *           description: Unauthorized
 *           content:
 *             text/html:
 *               schema:
 *                 type: string
 *                 format: base64
 *                 default: 'Unauthorized: No correct token provided'
 *         '412':
 *           description: 'Precondition Failed (El id de la serie es incorrecta)'
 *           content: {}
 *         '417':
 *           description: 'Expectation Failed (El usuario no ha puntado la serie. Devuelve unicamente series similares segun tmdb sin tener cuenta del usuario y sin hacer ningun proceso particular)'
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                 - type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/serie'
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.get('/porSimilitudes/serie/:serieId', isAuthorized, (req, res) => {
  api.get(req._parsedUrl.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(error.response.status == 417)
      res.send(error.response.data)
    else
      res.send(error.message + '\n' + error.response.data.error)
  })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/peliculas':
 *     get:
 *       tags:
 *         - listaNegra
 *       description: Recupera la lista de peliculas que no se deben recomendar al usuario autentificado.
 *       operationId: getListaNegraPeliculas
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/listaNegra'
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.get('/listaNegra/peliculas', isAuthorized, (req, res) => {
  api.get(req.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message + '\n' + error.response.data.error)
  })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/series':
 *     get:
 *       tags:
 *         - listaNegra
 *       description: Recupera la lista de series que no se deben recomendar al usuario autentificado.
 *       operationId: getListaNegraSeries
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/listaNegra'
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read 
 */
router.get('/listaNegra/series', isAuthorized, (req, res) => {
  api.get(req.path, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message)
  })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/pelicula/{peliculaId}':
 *     post:
 *       tags:
 *         - listaNegra
 *       description: Guarda en BB.DD. la pelicula que no se debe recomendar al usuario autentificado.
 *       operationId: addListaNegraPelicula
 *       parameters:
 *         - name: peliculaId
 *           in: path
 *           description: id de la pelicula para no recomendar
 *           required: true
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: Already exist
 *           content: {}
 *         '201':
 *           description: Created
 *           content: {}
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.post('/listaNegra/pelicula/:peliculaId', isAuthorized, (req, res) => {
  api.post(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message)
  })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/serie/{serieId}':
 *     post:
 *       tags:
 *         - listaNegra
 *       description: Guarda en BB.DD. la serie que no se debe recomendar al usuario autentificado.
 *       operationId: addListaNegraSerie
 *       parameters:
 *         - name: serieId
 *           in: path
 *           description: id de la serie para no recomendar
 *           required: true
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: Already exist
 *           content: {}
 *         '201':
 *           description: Created
 *           content: {}
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.post('/listaNegra/serie/:serieId', isAuthorized, (req, res) => {
  api.post(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    res.send(error.message)
  })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/pelicula/{peliculaId}':
 *     delete:
 *       tags:
 *         - listaNegra
 *       description: Elimina de la BB.DD. la pelicula que no se debe recomendar al usuario autentificado.
 *       operationId: deleteListaNegraPelicula
 *       parameters:
 *         - name: peliculaId
 *           in: path
 *           description: id de la pelicula para no recomendar
 *           required: true
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: OK
 *           content: {}
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *             - read
 */
router.delete('/listaNegra/pelicula/:peliculaId', isAuthorized, (req, res) => {
    api.delete(req.path, getConfig(req))
    .then(resp => {
      res.send(resp.data)
    })
    .catch(error => {
      res.send(error.message)
    })
})

/**
 * @swagger
 * path:
 *  '/listaNegra/serie/{serieId}':
 *     delete:
 *       tags:
 *         - listaNegra
 *       description: Elimina de la BB.DD. la serie que no se debe recomendar al usuario autentificado.
 *       operationId: deleteListaNegraSerie
 *       parameters:
 *         - name: serieId
 *           in: path
 *           description: id de la serie para no recomendar
 *           required: true
 *           schema:
 *             minimum: 1
 *             type: integer
 *             format: int64
 *       responses:
 *         '200':
 *           description: OK
 *           content: {}
 *         '401':
 *           description: Unauthorized
 *           content: {}
 *         '500':
 *           description: Internal Server Error
 *           content: {}
 *       security:
 *         - bearerAuth:
 *           - read
*/
router.delete('/listaNegra/serie/:serieId', isAuthorized, (req, res) => {
    api.delete(req.path, getConfig(req))
    .then(resp => {
        res.send(resp.data)
    })
    .catch(error => {
        res.send(error.message + '\n' + error.response.data.error)
    })
})
  

function getConfig(req) {
  return {
    headers: {
      Authorization: req.headers['authorization']
    }
  };
}

module.exports = router