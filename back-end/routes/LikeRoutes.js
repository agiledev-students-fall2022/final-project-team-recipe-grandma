const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
// const { authenticate } = require('../middleware/auth');

router.get('/test', LikeController.TestLikeFunction);
router.post('/like', LikeController.CreateLike);
router.get('/delete/', LikeController.DeleteLike);
router.get('/countlikebyrecipe', LikeController.CountLikeByRecipe);
router.get('/getlikebyrecipe/', LikeController.FindLikeByRecipe);
router.get('/getlikebyuser', LikeController.FindLikeByUser);
// router.get('/recbyname/:name', RecipeController.RecommendedbyName);

module.exports = router;
