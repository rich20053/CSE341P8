
/*** Albums ***/
const ral_express = require('express');
const ral_router = ral_express.Router();
const ral_validation = require('../middleware/validation');
const albumsController = require('../controllers/albums');

ral_router.get('/', albumsController.getAllAlbums);

ral_router.get('/:id', albumsController.getSingleAlbum);

ral_router.post('/', ral_validation.albumCheck, albumsController.createAlbum);

ral_router.put('/:id', ral_validation.albumCheck, albumsController.updateAlbumById);

ral_router.delete('/:id', albumsController.deleteAlbum);

module.exports = ral_router;

