// const express = require('express');
// const RecipeRouter = express.Router();
const Ingredient = require('../models/Ingredient');
const ingredientMockData = require('../ingredients_backup.json');
const Recipe = require('../models/Recipe');

class IngredientController {
  static async TestIngredientFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! Ingredient here!' });
  }

  static async CreateIngredient(req, res) {
    const { ingredient, recipes } = req.body;
    if (!ingredient || !recipes) {
      return res.status(400);
    }
    try {
      Recipe
        .findOne({ ingredient })
        .then((ingredientExistence) => {
          if (ingredientExistence) throw new Error('The ingredient exists');
        }).then(() => {
          Ingredient.create({
            ingredient,
            recipes,
          }).then((ingredients) => res.status(201).json({
            ingredient: ingredients.ingredient,
            recipes: ingredients.recipes,
          })).catch(() => {
            throw new Error('Failed to create ingredient');
          });
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    return null;
  }

  static async GetIngredients(req, res) {
    return res.status(200).json(ingredientMockData);
  }
}
module.exports = IngredientController;
