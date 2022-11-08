const express = require('express');
const ReviewCommentController = require('../controllers/ReviewCommentController');

const router = express.Router();

router.get('/review', ReviewCommentController.GetReviewComment);
router.get('/reviewTest', ReviewCommentController.TestReviewComment);
router.post('/recipe/:recipeindex/review/:id', ReviewCommentController.CreateReviewComment);

module.exports = router;
