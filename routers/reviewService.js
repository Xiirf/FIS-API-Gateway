var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator.js')

const BASE_URL = 'http://reviews-api.herokuapp.com/v1'
const api = apiAdapter(BASE_URL)

/**
 * @swagger
 *  components:
 *    schemas:
 *      Review:
 *        type: object
 *        required:
 *          - imdbId
 *          - rating
 *          - manufacturer
 *          - releaseDate
 *        properties:
 *          id:
 *            type: string
 *            readOnly: true
 *            example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *          imdbId:
 *            type: string
 *            example: tt0903747
 *          rating:
 *            type: number
 *            format: int32
 *            minimum: 1
 *            maximum: 5
 *            example: 4
 *          user:
 *            type: string
 *            example: 'agusnez'
 *          title:
 *            type: string
 *            example: 'It was remarkable'
 *          content:
 *            type: string
 *            example: 'I really enjoyed this show. Love the main actor.'
 *          created:
 *            type: string
 *            readOnly: true
 *            format: date-time
 *            example: '2019-12-01T17:32:28Z'
 *          impressions:
 *            type: object
 *            readOnly: true
 *            properties:
 *              like:
 *                type: integer
 *                example: 3
 *              dislike:
 *                type: integer
 *                example: 0
 *              spam:
 *                type: integer
 *                example: 0
 *      Impression:
 *        required:
 *          - user
 *          - reviewId
 *          - value
 *        properties:
 *          user:
 *            type: string
 *            description: Username whose is creating the impression.
 *            example: 'ronron'
 *          reviewId:
 *            type: string
 *            format: uuid
 *            description: ID of the review you are impressed of.
 *            example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *          value:
 *            type: string
 *            enum: [like, dislike, spam]
 *            description: If you are either liking or disliking on a review. You can also tag it as spam.
 *            example: like
 *        type: object
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: search reviews
 *     operationId: searchReview
 *     description: |
 *       By passing in the appropriate parameters, you can search for reviews of a specific IMDb resource and/or user in the system. If no parameter is specified, it returns the 5 latest reviews.
 *     parameters:
 *       - in: query
 *         name: imdbId
 *         description: pass an optional IMDb ID to get the reviews of that resource. Like a movie or TV show.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: user
 *         description: pass an optional username to get the reviews of that user.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: skip
 *         description: number of records to skip for pagination
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 0
 *       - in: query
 *         name: limit
 *         description: maximum number of records to return
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 0
 *           maximum: 50
 *     responses:
 *       '200':
 *         description: search results matching criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '400':
 *         description: bad input parameter
 */
router.get('/reviews', (req, res) => {
  api.get(req._parsedUrl.path, req.body)
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
        res.send(error.message)
      }else {
        res.status(error.response.status).send({error : error.response.data.error})
      }
  })
})

/**
 * @swagger
 * path:
 *  /reviews:
 *    post:
 *      tags:
 *        - Reviews
 *      summary: adds a review
 *      operationId: createReview
 *      description: Creates a review to a IMDb resource
 *      responses:
 *        '201':
 *          description: Review created
 *        '400':
 *          description: 'Invalid input, object invalid'
 *        '409':
 *          description: An existing review already exists for that resource
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Review'
 *        description: Review to create
 */
router.post('/reviews', isAuthorized, (req, res) => {
  api.post(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
        res.send(error.message)
      }else {
        res.status(error.response.status).send({error : error.response.data.error})
      }
  })
})

/**
 * @swagger
 * path:
 *  /reviews/{reviewId}:
 *    put:
 *      tags:
 *        - Reviews
 *      summary: updates a review
 *      operationId: updateReview
 *      description: Updates a review
 *      parameters: 
 *        - name: reviewId  
 *          in: path
 *          description: String id of the review you want to update
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '201':
 *          description: Review updated
 *        '400':
 *          description: 'Invalid input, object invalid'
 *        '401':
 *          description: Don't have access to that review
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Review'
 *        description: Inventory item to add
 */
router.put('/reviews', isAuthorized, (req, res) => {
  api.put(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
        res.send(error.message)
      }else {
        res.status(error.response.status).send({error : error.response.data.error})
      }
  })
})

/**
 * @swagger
 * path:
 *  /reviews/{reviewId}:
 *    delete:
 *      tags:
 *        - Reviews
 *      summary: deletes a review
 *      operationId: deleteReview
 *      description: Deletes a review
 *      parameters: 
 *        - name: reviewId  
 *          in: path
 *          description: String id of the review you want to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '201':
 *          description: Review updated
 *        '400':
 *          description: 'Invalid input, object invalid'
 *        '401':
 *          description: Don't have access to that review
 */
router.delete('/user', isAuthorized, (req, res) => {
  api.delete(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
        res.send(error.message)
      }else {
        res.status(error.response.status).send({error : error.response.data.error})
      }
  })
})

/**
 * @swagger
 * path:
 *   '/ratings/{imdbId}':
 *     get:
 *       summary: Returns the average rate of reviews of this movie
 *       tags: [Ratings]
 *       operationId: getRatings
 *       description: Returns the average rate of reviews of this movie
 *       parameters: 
 *         - name: imdbId  
 *           in: path
 *           description: 'Id of the review that you want to calculate the rate'
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: 'Average rate of reviews of this movie'
 *         "404":
 *           description: 'No rating found for that IMDB resource'
 *         "500":
 *           description: 'Internal error'
 */
router.get('/ratings/:imdbId', (req, res) => {
  api.get(req.path, req.body)
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
        res.send(error.message)
      }else {
        res.status(error.response.status).send({error : error.response.data.error})
      }
  })
})

/**
 * @swagger
 * path:
 *  /impressions:
 *    post:
 *      tags:
 *        - Impressions
 *      summary: creates an impression of a review
 *      operationId: createImpression
 *      description: Creates an impression of a review
 *      responses:
 *        '201':
 *          description: Impression created
 *        '400':
 *          description: 'Invalid input, object invalid'
 *        '409':
 *          description: An existing impression already exists for that review
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Impression'
 *        description: Inventory item to add
 */
router.post('/impressions', isAuthorized, (req, res) => {
  api.post(req.path, req.body, getConfig(req))
  .then(resp => {
    res.send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
      res.send(error.message)
    }else {
      res.status(error.response.status).send({error : error.response.data.error})
    }
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