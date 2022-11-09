// const express = require('express');
// const RecipeRouter = express.Router();
const Ingredient = require('../models/Ingredient');
const ingredientMockData = require('../ingredients_backup.json');

class IngredientController {
  static async TestIngredientFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Ingredient here!' });
  }

  static async CreateIngredient(req, res) {
    const { ingredient, type } = req.body;
    if (!ingredient || !(typeof ingredient === 'string') || !type || !(typeof type === 'string')) {
      return res.status(400);
    }
    const ingredients = new Ingredient({
      ingredient: req.body.ingredient,
      type: req.body.type,
    });
    return ingredients.save()
      .exec()
      .then((((data) => {
        res.json(data);
      })))
      .catch((((err) => {
        res.json({ message: err });
      })));
  }

  static async GetIngredients(req, res) {
    return res.status(200).json(ingredientMockData);
  }
}
module.exports = IngredientController;
