// const express = require('express');
// const RecipeRouter = express.Router();
const Ingredient = require('../models/Ingredient');

class IngredientController {
  static async TestIngredientFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! User here!' });
  }

  static async CreateIngredient(req, res) {
    const ingredient = new Ingredient({
      ingredient: req.body.Ingredient,
    });
    ingredient.save()
      .exec()
      .then((((data) => {
        res.json(data);
      })))
      .catch((((err) => {
        res.json({ message: err });
      })));
  }
}
module.exports = IngredientController;