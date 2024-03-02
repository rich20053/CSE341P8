/*** Artists ***/
var express = require('express');
var router = express.Router();
var validation = require('../middleware/validation');
var artistsController = require('../controllers/artists');
router.get('/', artistsController.getAll);
router.get('/:id', artistsController.getSingle);
router.post('/', validation.artistCheck, artistsController.createArtist);
router.put('/:id', validation.artistCheck, artistsController.updateArtist);
router.delete('/:id', artistsController.deleteArtist);
module.exports = router;
