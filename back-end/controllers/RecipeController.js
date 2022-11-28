// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');
// const data = require('../mockRecipeData.json');
// const LikedRecipes = require('../mockLikedRecipeData.json');
const { ObjectId } = require('mongoose').Types;
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

class RecipeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).json({ message: 'Hello, World! Recipes here!' });
  }

  static async CreateRecipe(req, res) {
    // Wrap in a try block due to JSON.parse
    // If JSON.parse fails, we'll have an error that'll crash us
    try {
      const {
        userId,
        name,
        ingredients,
        steps,
      } = req.body;

      const image = req.file;
      const ingredientsArr = JSON.parse(ingredients);
      const stepsArr = JSON.parse(steps);

      console.log('Steps input', stepsArr);

      const mimetypes = ['image/png', 'image/jpeg', 'image/jpg'];

      // Input validation
      if (
        !ObjectId.isValid(userId)
        || typeof name !== 'string'
        || !Array.isArray(ingredientsArr)
        || !Array.isArray(stepsArr)
        || !image
        || !ObjectId.isValid(image.id)
        || !mimetypes.includes(image.mimetype)
      ) {
        return res.status(400).json({ message: 'Invalid fields' });
      }

      const ingredientIds = [];

      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < ingredientsArr.length; i += 1) {
        const ing = ingredientsArr[i];
        const foundIng = await Ingredient.findOne({ name: { $regex: `^${ing.name}$`, $options: 'i' } });

        if (foundIng) {
          ingredientIds.push({
            id: foundIng.id,
            name: foundIng.name,
            ingredientType: foundIng.type,
            quantity: ing.quantity,
            unit: ing.unit.toLowerCase(),
          });
          /* eslint-disable no-continue */
          continue;
          /* eslint-enable no-continue */
        }

        const newIng = await Ingredient.create({
          name: ing.name,
          type: ing.type.toLowerCase(),
        });

        ingredientIds.push({
          id: newIng.id,
          name: newIng.name,
          ingredientType: newIng.type,
          quantity: ing.quantity,
          unit: ing.unit.toLowerCase(),
        });
      }
      /* eslint-enable no-await-in-loop */

      // Create the recipe if validation passes
      // We pass the image as an object ID as per our model's requirement
      // Thus, we can grab the image data from our image bucket later
      // In other words, in our HTML or post man, we can have a GET request
      // towards the route http://localhost:8000/rgapi/media/:imageId
      // And we get our image served to us directly from the database
      Recipe.create({
        userId,
        name,
        ingredients: ingredientIds,
        steps: stepsArr,
        cover: image.id,
      }).then(async (recipe) => {
        res.status(200).json({
          _id: recipe.id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cover: recipe.cover,
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
    return null;
  }

  // create a recipe
  static async NewRecipe(req, res) {
    const {
      userId, username, name, ingredients, steps, imageURL,
    } = req.body;
    if (!userId || !username || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    try {
      Recipe.create({
        userId,
        username,
        name,
        ingredients,
        steps,
        imageURL,
      }).then((recipe) => res.status(201).json({
        userId: recipe.userId,
        username: recipe.username,
        name: recipe.name,
        lowercasedName: recipe.name.toLowerCase().replace(' ', '-'),
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageURL: recipe.imageURL,
      })).catch(() => {
        throw new Error('Failed to create recipe');
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    return null;
  }

  // delete recipe
  static async DeleteRecipe(req, res) {
    Recipe.deleteOne({ _id: req.params.id }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log('A recipe deleted!');
    });
  }

  // get all recipes
  static async GetRecipes(req, res) {
    const recipe = Recipe.find({}, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // single recipe in a page
  static async SingleRecipe(req, res) {
    const recipe = Recipe.findOne({ _id: req.params.id }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // recipes by user ID
  static async getRecipeByUser(req, res) {
    const recipe = Recipe.find({ userId: req.params.userId }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // recommendation algorithm 1: search by ingredients
  static async RecommendedbyIngredients(req, res) {
    // still need to develop
    // for now, returning to home page with all recipes in MongoDB
    const recipe = Recipe.find({}, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // recommendation algorithm 2: search by user's likes

  // recommendation algorithm 3: search by recipe name
  static async RecommendedbyName(req, res) {
    // if input from URL = big-night-pizza,
    // modifiedname = big night pizza,
    // $options: changes modifedname to case-insensitive to match with name
    const modifiedname = req.params.name.replace('-', ' ');
    console.log(modifiedname);
    const recipe = Recipe.find({ name: { $regex: modifiedname, $options: 'i' } }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }
}

module.exports = RecipeController;
