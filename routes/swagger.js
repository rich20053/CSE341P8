var sw_router = require('express').Router();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');
sw_router.use('/api-docs', swaggerUi.serve);
sw_router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = sw_router;
