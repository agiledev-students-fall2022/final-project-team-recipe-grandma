// const express = require('express');
// const RecipeRouter = express.Router();
const Ingredient = require('../models/Ingredient');

class IngredientController {
  static async TestIngredientFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Ingredient here!' });
  }

  static async FetchIngredientsByName(req, res) {
    const { name } = req.params;
    Ingredient.find({ name: { $regex: name, $options: 'i' } }).then((ingList) => {
      res.json(ingList);
    }).catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Couldn\'t find an ingredient' });
    });
  }

  static async GetIngredients(req, res) {
    Ingredient.find({}).then((ingredients) => res.status(200).json(ingredients))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Couldn\'t find ingredients' });
      });
  }
}
module.exports = IngredientController;
