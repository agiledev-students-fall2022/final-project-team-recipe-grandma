const Like = require('../models/Like');
const Recipe = require('../models/Recipe');

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
    const existingLike = await Like.findOne({ userId, parentId });

    if (existingLike) return res.status(200).json({ message: 'Already liked!' });

    const rec = await Recipe.findOne({ _id: parentId });
    const newLike = await Like.create({ userId, parentId });
    if (newLike) {
      rec.likes += 1;
      await rec.save();
    }
    return res.status(200).json(rec);
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

  static async CheckUserLikedRecipe(req, res) {
    const { user } = req;
    console.log('User id is', user.id, req.params.recipeId);
    const userLikes = await Like.find({ userId: user.id, parentId: req.params.recipeId });
    return res.status(200).json(userLikes);
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
    const parentId = req.body.recipeId;

    const rec = await Recipe.findOne({ _id: parentId });
    console.log(rec);
    if (!rec) return res.status(400).json({ message: 'Recipe not found' });
    Like.deleteOne({ userId: user.id, parentId }).then(() => {
      rec.likes -= 1;
      rec.save();
      res.status(200).json({
        message: 'Like deleted',
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Like deletion rejected' });
    });
    return true;
  }
}

module.exports = LikeController;
