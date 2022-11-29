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
      body, stars, username, parentId,
    } = req.body;
    const reviewComment = await ReviewComment.create({
      body,
      stars,
      username,
      parentId,
    });

    if (reviewComment) {
      return res.status(201).json({
        _id: reviewComment.id,
        body: reviewComment.body,
        stars: reviewComment.stars,
        username: reviewComment.username,
        parentId: reviewComment.parentId,
      });
    }
    return res.status(500);
  }

  static async GetReviewDatabase(req, res) {
    return ReviewComment.find({ parentId: req.params.id })
      .then((reviews) => {
        if (reviews) {
          res.status(200).json({
            reviews,
          });
        } else {
          res.sendStatus(400);
        }
      });
  }

  static async GetSingleReviewDatabase(req, res) {
    return ReviewComment.find({ _id: req.params.id })
      .then((review) => {
        if (review) {
          res.status(200).json({
            review,
          });
        } else {
          res.sendStatus(400);
        }
      });
  }
}

module.exports = ReviewCommentController;
