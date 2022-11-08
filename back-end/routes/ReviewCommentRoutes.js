const express = require('express');
const ReviewCommentController = require('../controllers/ReviewCommentController');

const router = express.Router();

router.get('/recipe/:recipeindex/review', ReviewCommentController.GetReviewComment);
router.post('/recipe/:recipeindex/review/:id', ReviewCommentController.CreateReviewComment);
router.post('/recipe/:recipeindex/review/:id/update', ReviewCommentController.UpdateReviewComment);
router.delete('/recipe/:recipeindex/review/:id/delete', ReviewCommentController.DeleteReviewComment);

module.exports = router;
