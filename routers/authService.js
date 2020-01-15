var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator.js')

const BASE_URL = 'https://fis-backend-login.herokuapp.com/api/v1'
const request = apiAdapter(BASE_URL, "AUTH");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - login
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          login:
 *            type: string
 *            description: Login for the user, needs to be unique.
 *          password:
 *            type: string
 *            description: Password for the user
 *        example:
 *          email: test@email.com
 *          login: loginTest
 *          password: mdpTest
 *           
 */

/**
 * @swagger
 * path:
 *  /user:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: User created
 *        "400":
 *          description: Parameters are missing
 *        "401":
 *          description: Login or email already used
 */
router.post('/user', (req, res) => {
  request(req.path, getConfig(req, 'POST'))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

/**
 * @swagger
 * path:
 *  /authenticate:
 *    post:
 *      summary: Authenticate
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - login
 *                - password
 *              properties:
 *                login:
 *                  type: string
 *                  description: Login for the user.
 *                password:
 *                  type: string
 *                  description: New password.
 *              example:
 *                login: loginTest
 *                password: mdpTest
 *      responses:
 *        "200":
 *          description: User updated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - token
 *                properties:
 *                  token:
 *                    type: string
 *                    description: Token.
 *        "400":
 *          description: Parameters are missing
 *        "404":
 *          description: Ressource not found
 *        "500":
 *          description: Server error
 */
router.post('/authenticate', (req, res) => {
  request(req.path, getConfig(req, 'POST'))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

/**
 * @swagger
 * path:
 *  /user/forgottenPassword:
 *    post:
 *      summary: Send an email to change password
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                  description: User email.
 *              example:
 *                email: test@email.com
 *      responses:
 *        "200":
 *          description: Email send.
 *        "404":
 *          description: Ressource not found
 *        "500":
 *          description: Internal error
 */
router.post('/user/forgottenPassword', (req, res) => {
  request(req.path, getConfig(req, 'POST'))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Return all users login and email
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - email
 *                  - login
 *                properties:
 *                  email:
 *                    type: string
 *                    description: User email.
 *                  login:
 *                    type: string
 *                    description: User login.
 *        "404":
 *          description: Ressource not found
 *        "500":
 *          description: Internal error
 */
router.get('/users', isAuthorized, (req, res) => {
  request(req.path, getConfig(req))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

/**
 * @swagger
 * path:
 *  /user:
 *    get:
 *      summary: Get actual user info
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Return all users login and email
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - email
 *                  - login
 *                properties:
 *                  email:
 *                    type: string
 *                    description: User email.
 *                  login:
 *                    type: string
 *                    description: User login.
 *        "404":
 *          description: Ressource not found
 *        "500":
 *          description: Internal error
 */
router.get('/user', isAuthorized, (req, res) => {
  request(req.path, getConfig(req))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

/**
 * @swagger
 * path:
 *  /checkToken:
 *    get:
 *      summary: Check if the token is valid
 *      tags: [Token]
 *      responses:
 *        "200":
 *          description: Token is valid.
 *        "401":
 *          description: Unauthorized
 *        "500":
 *          description: Internal error
 */
router.get('/checkToken', isAuthorized, (req, res) => {
  request(req.path, getConfig(req))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send(error.message)
  })
})

/**
 * @swagger
 * path:
 *  /user:
 *    put:
 *      summary: Update User
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                newEmail:
 *                  type: string
 *                  format: email
 *                  description: Email for the user.
 *                newPassword:
 *                  type: string
 *                  description: New password.
 *              example:
 *                newEmail: test@email.com
 *                newPassword: newMdp
 *      responses:
 *        "200":
 *          description: User updated
 *        "400":
 *          description: Parameters are missing
 *        "404":
 *          description: Ressource not found
 *        "500":
 *          description: Server error
 */
router.put('/user', isAuthorized, (req, res) => {
  request(req.path, getConfig(req, 'PUT'))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    if(!error.response.data.error){
      res.status(error.response.status).send(error.message)
    }else {
      res.status(error.response.status).send({error : error.response.data.error})
    }
  })
})

/**
 * @swagger
 * path:
 *  /user:
 *    delete:
 *      summary: Delete user
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: User deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "400":
 *          description: Parameters are missing
 *        "404":
 *          description: User not found
 *        "500":
 *          description: Internal error
 */
router.delete('/user', isAuthorized, (req, res) => {
  request(req.path, getConfig(req, 'DELETE'))
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(error => {
    res.status(error.response.status).send({error : error.response.data.error})
  })
})

function getConfig(req, method = "GET") {
  var config = {};
  config.method = method;
  if(req.headers['authorization'])
    config.headers = { Authorization: req.headers['authorization'] }
  if(req.body)
    config.data = req.body;  
  return config;
}

module.exports = router