const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.post('/like', authenticate, LikeController.CreateLike);
router.get('/delete/:userId', authenticate, LikeController.DeleteLike);
router.get('/getlikebyuser', authenticate, LikeController.FindLikeByUser);
router.get('/getlikebyrecipe', authenticate, LikeController.FindLikeByRecipe);

module.exports = router;
