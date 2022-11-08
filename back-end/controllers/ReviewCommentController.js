const axios = require('axios');
const ReviewComment = require('../models/ReviewComment');

class ReviewCommentController {
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
    await axios.get('https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json')
      .then((((data) => {
        res.json(data);
      })))
      .catch((((err) => {
        res.json({ message: err });
      })));
  }

  static async UpdateReviewComment(req, res) {
    const {
      id, body, stars, username, userId, parentId, createdAt,
    } = req.body;

    const doesCommentExist = await ReviewComment.findOne({ id });

    if (doesCommentExist) {
      ReviewComment.body = body;
      ReviewComment.stars = stars;
      ReviewComment.createdAt = createdAt;
      ReviewComment.username = username;
      ReviewComment.id = id;
      ReviewComment.userId = userId;
      ReviewComment.parentId = parentId;
      ReviewComment.createdAt = createdAt;
    }

    return res.status(400);
  }

  static async DeleteReviewComment(req, res) {
    const id = req.body;

    const comment = await ReviewComment.findone({ id });

    if (comment) {
      await comment.findByIdAndDelete(id);
    }
    return res.status(400);
  }
}

module.exports = ReviewCommentController;
