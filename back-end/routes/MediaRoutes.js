const express = require('express');
const MediaController = require('../controllers/MediaController');

const router = express.Router();

router.get('/:imageId', MediaController.GetImage);

module.exports = router;
