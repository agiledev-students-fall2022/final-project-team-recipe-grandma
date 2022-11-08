// const express = require('express');
// const RecipeRouter = express.Router();
// const Recipe = require('../models/Recipe');

class LikeController {
  static async TestLikeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Like here!' });
  }

  static async Like(req, res) {
    try {
      console.log('liked');
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

module.exports = LikeController;
