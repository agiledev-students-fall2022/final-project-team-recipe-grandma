const express = require('express');
const ReviewCommentController = require('../controllers/ReviewCommentController');

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
router.get('/review/:index', ReviewCommentController.GetReviewComment);
router.get('/review/:index1/:index2', ReviewCommentController.GetSingleReviewComment);
router.get('/reviewTest', ReviewCommentController.TestReviewComment);
router.post('/review/create', ReviewCommentController.CreateReviewComment);

module.exports = router;
