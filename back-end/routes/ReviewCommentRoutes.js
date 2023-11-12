const express = require('express');
const ReviewCommentController = require('../controllers/ReviewCommentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
// router.get('/review/:index', ReviewCommentController.GetReviewComment);
// router.get('/review/:index1/:index2', ReviewCommentController.GetSingleReviewComment);
router.get('/database/single/:id', authenticate, ReviewCommentController.GetSingleReviewDatabase);
router.get('/database/:id', authenticate, ReviewCommentController.GetReviewDatabase);
router.get('/reviewTest', authenticate, ReviewCommentController.TestReviewComment);
router.post('/review/create', authenticate, ReviewCommentController.CreateReviewComment);
// router.post('/review/delete/:username', ReviewCommentController.DeleteReviewDatabase);

module.exports = router;
