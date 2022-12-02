const express = require('express');
const LikeController = require('../controllers/LikeController');

const router = express.Router();
// const { authenticate } = require('../middleware/auth');

router.get('/test', LikeController.TestLikeFunction);
router.post('/like', LikeController.CreateLike);
router.get('/delete/', LikeController.DeleteLike);
router.get('/countlikebyrecipe/:recipeid', LikeController.CountLikeByRecipe);
router.get('/getlikebyrecipe/:recipeid', LikeController.FindLikeByRecipe);
router.get('/getlikebyuser/:userid', LikeController.FindLikeByUser);

module.exports = router;
