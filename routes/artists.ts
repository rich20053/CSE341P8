
/*** Artists ***/
const rar_express = require('express');
const rar_router = rar_express.Router();
const rar_validation = require('../middleware/validation');
const artistsController = require('../controllers/artists');

rar_router.get('/', artistsController.getAllArtists);

rar_router.get('/:id', artistsController.getSingleArtist);

rar_router.post('/', rar_validation.artistCheck, artistsController.createArtist);

rar_router.put('/:id', rar_validation.artistCheck, artistsController.updateArtist);

rar_router.delete('/:id', artistsController.deleteArtist);

module.exports = rar_router;

