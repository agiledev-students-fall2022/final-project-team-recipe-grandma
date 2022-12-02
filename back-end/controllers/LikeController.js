const Like = require('../models/Like');
// const Recipe = require('../models/Recipe');

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
            console.log('Like created!');
          }
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async CountLikeByRecipe(req, res) {
    const {
      recipeId,
    } = req.body;

    try {
      const likeCount = Like.count({ recipeId });
      res.json(likeCount);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async DeleteLike(req, res) {
    const {
      userId,
      recipeId,
    } = req.body;
    try {
      const RemoveLike = await Like.remove({ userId, recipeId });
      res.json(RemoveLike);
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = LikeController;
