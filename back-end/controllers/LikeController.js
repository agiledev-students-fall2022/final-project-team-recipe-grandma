const Like = require('../models/Like');
const Recipe = require('../models/Recipe');
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
      parentId,
    } = req.body;
    const { user } = req; // user info from auth
    const userId = user.id;
    Like
      .findOne({ userId, parentId })
      .then((likeExistence) => {
        if (likeExistence) {
          res.status(200).json({ message: 'Already liked!' });
        } else {
          Like.create({
            userId,
            parentId,
          }).then(async (like) => {
            Recipe.update({ id: like.parentId }, { $inc: { likes: 1 } });
          });
          // res.status(200).json({ like });
        }
      }).catch((err) => res.status(400).json({ message: err.message }));
  }

  static async FindLikeByUser(req, res) {
    const { user } = req;
    const userId = user.id;
    Like.find({ userId }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
    });
  }

  static async FindLikeByRecipe(req, res) {
    Like.find({ parentId: req.params.parentId })
      .then((liked) => {
        if (liked) {
          res.status(200).json(liked);
        } else {
          res.sendStatus(400);
        }
      });
  }

  // Count for recipe like
  static async CountLikeByRecipe(req, res) {
    const {
      parentId,
    } = req.body;

    try {
      const likeCount = Like.count({ parentId });
      res.json(likeCount);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async DeleteLike(req, res) {
    const { user } = req;
    Like.deleteOne({ userId: String(user.id), parentId: req.params.recipeId }).then((result) => {
      res.status(200).json({
        message: 'Like deleted',
        result,
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Like deletion rejected' });
    });
  }
}

module.exports = LikeController;
