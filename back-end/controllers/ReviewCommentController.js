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
      if (req.params.index >= result.data.length || req.params.index < 0) {
        return res.sendStatus(400);
      }
      return res.status(201).json(result.data[req.params.index]);
    }
    return res.sendStatus(400);
  }

  static async GetSingleReviewComment(req, res) {
    const result = await axios.get('https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json').catch((err) => console.log(err.message));
    if (result && Array.isArray(result.data)) {
      if (req.params.index1 > result.data.length || req.params.index1 < 0) {
        return res.sendStatus(400);
      }
      if (req.params.index1 > result.data[req.params.index1].length || req.params.index2 < 0) {
        return res.sendStatus(400);
      }
      return res.status(201).json(result.data[req.params.index1].reviews[req.params.index2]);
    }
    return res.sendStatus(400);
  }
}

module.exports = ReviewCommentController;
