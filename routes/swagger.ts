const sw_router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
sw_router.use('/api-docs', swaggerUi.serve);
sw_router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = sw_router;