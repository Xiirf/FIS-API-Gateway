
var express = require('express');
var router = express.Router()

var authRouter = require('./authService')
var movieRouter = require('./moviesApi')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authRouter)
router.use(movieRouter)

module.exports = router