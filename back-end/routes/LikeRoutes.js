const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();

router.post('/like', LikeController.CreateLike);

module.exports = router;
