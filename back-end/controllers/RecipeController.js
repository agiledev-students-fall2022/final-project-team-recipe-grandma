// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');

const { ObjectId } = require('mongoose').Types;
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const User = require('../models/User');
const ReviewComment = require('../models/ReviewComment');

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
        console.log(
          typeof name !== 'string',
          !Array.isArray(ingredientsArr),
          !Array.isArray(stepsArr),
          !image,
          !ObjectId.isValid(image.id),
          !mimetypes.includes(image.mimetype),
        );
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
        const user = await User.findOne({ _id: recipe.userId });
        if (!user) return res.status(500).json({ message: 'Could not find user' });
        return res.status(200).json({
          _id: recipe.id,
          author: user.name,
          name: recipe.name,
          likes: 0,
          ingredients: recipe.ingredients,
          rating: 0,
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
    const { user } = req;
    const rec1 = await Recipe.findOne({ _id: req.body.id, userId: user._id });
    if (!rec1) {
      return res.status(400).send({ err: 'Invalid request.' });
    }
    await Recipe.deleteOne({ _id: req.body.id }).then((rec) => {
      res.json(rec);
      console.log('A recipe deleted!');
    }).catch((err) => {
      res.status(500).send({ err: err.message });
    });

    return null;
  }

  // get all recipes
  static async GetRecipes(req, res) {
    const recipes = await Recipe.find({}).sort({ createdAt: 'desc' });
    if (!recipes) return res.status(500).json({ message: 'Could not fetch recipes' });

    const freshRecipes = [];
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < recipes.length; i += 1) {
      const rec = recipes[i];
      const user = await User.findOne({ _id: rec.userId });
      if (!user) return res.status(500).json({ message: 'Could not find user' });
      const averageRatingAggregate = await ReviewComment.aggregate([
        { $match: { parentId: ObjectId(rec.id) } },
        { $group: { _id: { parentId: rec.id }, average: { $avg: '$stars' } } },
      ]);
      const averageRating = averageRatingAggregate[0]?.average || 0;
      rec.author = user.name;
      const freshRec = {
        _id: rec.id,
        userId: rec.userId,
        name: rec.name,
        likes: rec.likes || 0,
        ingredients: rec.ingredients,
        rating: averageRating,
        steps: rec.steps,
        author: user.name,
        cover: rec.cover,
        createdAt: rec.createdAt,
        updatedAt: rec.updatedAt,
      };
      freshRecipes.push(freshRec);
    }
    /* eslint-enable no-await-in-loop */

    return res.status(200).json(freshRecipes);
  }

  // single recipe in a page
  static async SingleRecipe(req, res) {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: recipe.userId });
    const averageRatingAggregate = await ReviewComment.aggregate([
      { $match: { parentId: ObjectId(recipe.id) } },
      { $group: { _id: { parentId: recipe.id }, average: { $avg: '$stars' } } },
    ]);
    const averageRating = averageRatingAggregate[0]?.average || 0;
    console.log('Average rating is', averageRating);
    return res.status(200).json({
      _id: recipe.id,
      userId: recipe.userId,
      name: recipe.name,
      likes: recipe.likes || 0,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      author: user.name,
      rating: averageRating,
      cover: recipe.cover,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    });
    // try {
    //   Recipe.findOne({ _id: req.params.id }).then((rec) => {
    //     console.log(res.status);
    //     return res.status(200).send(rec);
    //   }).catch((err) => {
    //     console.log(err);
    //     // res.status(500).json({ message: 'Could not find recipe' });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  // recipes by user ID
  static async getRecipeByUser(req, res) {
    const { user } = req;
    Recipe.find({ userId: user._id }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
    });
  }

  // @desc Search by ingredients. Takes in an array of ingredient ObjectIds
  // @desc Format: [{ "id": "<ObjectId>" }, ...]
  // @route /rgapi/recipe/search-by-ingredients
  // @access Public
  static async RecommendedbyIngredients(req, res) {
    const { ingredients } = req.body;
    if (!ingredients) return res.status(401).json({ message: 'Ingredients missing.' });

    for (let i = 0; i < ingredients.length; i += 1) {
      if (!ObjectId.isValid(ingredients[i]._id)) {
        console.log(ingredients[i], 'Invalid data');
        return res.status(401).json({ message: 'Improper ingredients sent.' });
      }
    }

    const matchQuery = ingredients.map((x) => {
      const output = { $elemMatch: { id: x._id } };
      return output;
    });

    const recipes = await Recipe.find({ ingredients: { $all: matchQuery } }).sort({ createdAt: 'asc' }).catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'An error occurred searching for ingredients' });
    });
    if (!recipes) {
      return res.status(401).json({
        message: 'An error occurred searching for ingredients',
      });
    }

    const freshRecipes = [];
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < recipes.length; i += 1) {
      const rec = recipes[i];
      console.log(rec.createdAt);
      const user = await User.findOne({ _id: rec.userId });
      if (!user) return res.status(500).json({ message: 'Could not find user' });
      const averageRatingAggregate = await ReviewComment.aggregate([
        { $match: { parentId: ObjectId(rec.id) } },
        { $group: { _id: { parentId: rec.id }, average: { $avg: '$stars' } } },
      ]);
      const averageRating = averageRatingAggregate[0]?.average || 0;
      rec.author = user.name;
      const freshRec = {
        _id: rec.id,
        userId: rec.userId,
        name: rec.name,
        likes: rec.likes,
        ingredients: rec.ingredients,
        rating: averageRating,
        steps: rec.steps,
        author: user.name,
        cover: rec.cover,
        createdAt: rec.createdAt,
        updatedAt: rec.updatedAt,
      };
      freshRecipes.push(freshRec);
    }
    /* eslint-enable no-await-in-loop */
    // sort the freshRecipes in descending order of likes
    for (let j = 0; j < freshRecipes.length; j += 1) {
      for (let k = j + 1; k < freshRecipes.length; k += 1) {
        if (freshRecipes[j].likes > freshRecipes[k].likes) {
          const temp = freshRecipes[j];
          freshRecipes[j] = freshRecipes[k];
          freshRecipes[k] = temp;
        }
      }
    }
    freshRecipes.reverse();
    res.status(200).json(freshRecipes);
    return true;
  }

  // search by recipe name
  static async SearchbyName(req, res) {
    const modifiedname = req.params.name.replace('-', ' ');

    const recipes = await Recipe.find({ name: { $regex: modifiedname, $options: 'i' } }).sort({ createdAt: 'desc' });

    const freshRecipes = [];
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < recipes.length; i += 1) {
      const rec = recipes[i];
      const user = await User.findOne({ _id: rec.userId });
      if (!user) return res.status(500).json({ message: 'Could not find user' });
      const averageRatingAggregate = await ReviewComment.aggregate([
        { $match: { parentId: rec.id } },
        { $group: { _id: { parentId: rec.id }, average: { $avg: '$stars' } } },
      ]);
      const averageRating = averageRatingAggregate[0]?.average || 5;
      rec.author = user.name;
      const freshRec = {
        _id: rec.id,
        userId: rec.userId,
        name: rec.name,
        likes: rec.likes,
        ingredients: rec.ingredients,
        rating: averageRating,
        steps: rec.steps,
        author: user.name,
        cover: rec.cover,
        createdAt: rec.createdAt,
        updatedAt: rec.updatedAt,
      };
      freshRecipes.push(freshRec);
    }
    /* eslint-enable no-await-in-loop */

    return res.status(200).json(freshRecipes);
  }
}

module.exports = RecipeController;
