var express = require('express');
var router = express.Router()
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "FIS API Gateway",
        version: "1.0.0",
        description:
          "Documentation API FIS-API-Gateway",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [{
        bearerAuth: []
      }],
      servers: [
        {
          url: process.env.urlApp || "http://127.0.0.1:3005/api/v1"
        }
      ]
    },
    apis: [
        "./routers/authService.js",
        "./routers/moviesApi.js",
        "./routers/reviewService.js",
        "./routers/recomendadorService.js"
    ],        
  };

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

module.exports = router