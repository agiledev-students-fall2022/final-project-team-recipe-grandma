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
    const {
      id, body, stars, username, userId, parentId, createdAt,
    } = req.body;
    const reviewComment = await ReviewComment.create({
      id,
      body,
      stars,
      username,
      userId,
      parentId,
      createdAt,
    });

    if (reviewComment) {
      return res.status(201).json({
        id: reviewComment.id,
        body: reviewComment.body,
        stars: reviewComment.stars,
        username: reviewComment.username,
        userId: reviewComment.userId,
        parentId: reviewComment.parentId,
        createdAt: reviewComment.createdAt,
      });
    }
    return res.status(400);
  }

  static async GetReviewComment(req, res) {
    const result = await axios.get('https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json').catch((err) => console.log(err.message));
    if (result && Array.isArray(result.data)) {
      return res.status(201).json(result.data);
    }
    return res.status(400);
  }
}

module.exports = ReviewCommentController;
