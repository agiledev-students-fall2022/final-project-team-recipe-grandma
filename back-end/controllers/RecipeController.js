const express = require('express');
const RecipeRouter = express.Router();
const Recipe = require("../models/Recipe.js");

class RecipeController {
    static async TestRecipeFunction(req, res) {
        if (req.body.text) {
          return res.status(400).json({ message: 'Bad request test!' });
        }
        return res.status(200).json({ message: 'Hello, World! User here!' });
      }

    static async GetRecipe(req, res) {
        const recipe = new Recipe({
            name: req.body.name,
            id: req.body.id,
            photo: req.body.photo,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        });
        recipe.save()
              .exec()
              .then(data => {
                res.json(data);
              })
              .catch(err => {
                res.json({ message: err });
            });
    }
}

module.exports = RecipeController;
