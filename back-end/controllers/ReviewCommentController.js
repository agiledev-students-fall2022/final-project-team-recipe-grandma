const axios = require('axios');
const ReviewComment = require('../models/ReviewComment');

class ReviewCommentController {
  static async TestReviewComment(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).json({ message: 'Hello, World! Reviews here!' });
  }

  static async CreateReviewComment(req, res) {
    const reviewComment = new ReviewComment({
      id: req.body.id,
      body: req.body.body,
      stars: req.body.stars,
      username: req.body.username,
      userId: req.body.userId,
      parentId: req.body.parentId,
      createdAt: req.body.createdAt,
    });
    reviewComment.save()
      .exec()
      .then((((data) => {
        res.json(data);
      })))
      .catch((((err) => {
        res.json({ message: err });
      })));
  }

  static async GetReviewComment(req, res) {
    const result = await axios.get('https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json').catch((err) => console.log(err.message));
    if (result && Array.isArray(result.data)) {
      return result.data;
    }
    return res.status(200);
  }
}

module.exports = ReviewCommentController;
