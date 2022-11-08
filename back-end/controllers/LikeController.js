const Like = require('../models/Like');

class LikeController {
  static async TestLikeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Like here!' });
  }

  static async CreateLike(req, res) {
    const like = new Like({
      userId: req.body.userId,
      recipeId: req.body.recipeId,
    });
    try {
      const NewLike = await like.save();
      res.status(201).send(NewLike);
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
