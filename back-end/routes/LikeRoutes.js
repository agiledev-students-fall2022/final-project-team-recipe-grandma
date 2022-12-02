const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/test', LikeController.TestLikeFunction);
router.post('/like', authenticate, LikeController.CreateLike);
router.get('/delete/', authenticate, LikeController.DeleteLike);
router.get('/countlikebyrecipe', authenticate, LikeController.CountLikeByRecipe);
router.get('/getlikebyrecipe', authenticate, LikeController.FindLikeByRecipe);
router.get('/getlikebyuser', authenticate, LikeController.FindLikeByUser);
// router.get('/recbyname/:name', RecipeController.RecommendedbyName);

module.exports = router;
