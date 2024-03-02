/*** Albums ***/
var express = require('express');
var router = express.Router();
var validation = require('../middleware/validation');
var albumsController = require('../controllers/albums');
router.get('/', albumsController.getAll);
router.get('/:id', albumsController.getSingle);
router.post('/', validation.albumCheck, albumsController.createAlbum);
router.put('/:id', validation.albumCheck, albumsController.updateAlbumById);
router.delete('/:id', albumsController.deleteAlbum);
module.exports = router;
