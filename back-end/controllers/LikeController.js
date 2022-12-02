const Like = require('../models/Like');

class LikeController {
  static async TestLikeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Like here!' });
  }

  static async CreateLike(req, res) {
    const {
      userId,
      recipeId,
    } = req.body;

    try {
      Like
        .findOne({ userId, recipeId })
        .then((likeExistence) => {
          if (likeExistence) {
            res.status(400).json({ message: 'Already liked!' });
          } else {
            Like.create({
              userId,
              recipeId,
            });
          }
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async FindLikeByUser(req, res) {
    try {
      const like = Like.findById(req.params.userId);
      res.send(like);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async FindLikeByRecipe(req, res) {
    try {
      const like = Like.findById(req.params.recipeId);
      res.send(like);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async DeleteLike(req, res) {
    try {
      const RemoveLike = await Like.remove(req.params.userId);
      res.json(RemoveLike);
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = LikeController;
