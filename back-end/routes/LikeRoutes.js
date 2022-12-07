const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/test', LikeController.TestLikeFunction);
router.post('/like', authenticate, LikeController.CreateLike);
router.post('/delete/:recipeId', authenticate, LikeController.DeleteLike);
router.get('/countlikebyrecipe/:recipeid', LikeController.CountLikeByRecipe);
router.get('/getlikebyrecipe/:parentId', LikeController.FindLikeByRecipe);
router.get('/getlikebyuser', authenticate, LikeController.FindLikeByUser);

module.exports = router;
