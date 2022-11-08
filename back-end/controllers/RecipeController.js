// const express = require('express')
// const axios = require('axios')
const Recipe = require('../models/Recipe');

class RecipeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! User here!' });
  }

  static async CreateRecipe(req, res) {
    const recipe = new Recipe({
      name: req.body.name,
      id: req.body.id,
      photo: req.body.photo,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
    });
    try {
      const NewRecipe = await recipe.save();
      res.status(201).send(NewRecipe);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }

  static async DeleteRecipe(req, res) {
    try {
      const RemoveRecipe = await Recipe.remove(req.params.id);
      res.json(RemoveRecipe);
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  static async SingleRecipe(req, res) {
    try {
      const SingleRecipe = await Recipe.findById(req.params.id);
      res.json(SingleRecipe);
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // static async EditLike(req, res) {
  // }

  // static async EditComment(req, res) {
  // }

  // static async RecommendedRecipe(req, res) {
  // }
}

module.exports = RecipeController;
