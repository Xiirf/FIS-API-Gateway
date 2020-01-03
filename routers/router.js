
var express = require('express');
var router = express.Router()

var swaggerDoc = require('./swaggerDoc')
var authRouter = require('./authService')
var recomendadorRouter = require('./recomendadorService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authRouter)
router.use(recomendadorRouter)
router.use(swaggerDoc)

module.exports = router