
var express = require('express');
var router = express.Router()

var authRouter = require('./authService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authRouter)

module.exports = router