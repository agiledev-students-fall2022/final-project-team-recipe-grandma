const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.post('/like', authenticate, LikeController.CreateLike);

module.exports = router;
