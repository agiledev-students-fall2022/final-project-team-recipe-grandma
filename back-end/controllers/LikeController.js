// const express = require('express');
// const RecipeRouter = express.Router();
const Recipe = require('../models/Recipe');

class LikeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Recipes here!' });
  }

  static async CreateRecipe(req, res) {
    const recipe = new Recipe({
      name: req.body.name,
      id: req.body.id,
      photo: req.body.photo,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      like: 0,
    });
    try {
      const NewRecipe = await recipe.save();
      res.status(201).send(NewRecipe);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
}

module.exports = LikeController;
