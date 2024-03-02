
/*** Songs ***/
const rs_express = require('express');
const rs_router = rs_express.Router();
const rs_validation = require('../middleware/validation');
const songsController = require('../controllers/songs');

rs_router.get('/', songsController.getAllSongs);

rs_router.get('/:id', songsController.getSingleSong);

rs_router.post('/', rs_validation.songCheck, songsController.createSong);

rs_router.put('/:id', rs_validation.songCheck, songsController.updateSong);

rs_router.delete('/:id', songsController.deleteSong);

module.exports = rs_router;

