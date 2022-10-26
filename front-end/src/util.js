import axios from 'axios';

const ingredientData = require('./ingredients_backup.json');

type CallbackType = (p1: Array) => void;

async function fetchRecipeData(callback: CallbackType) {
  let result = await axios(
    'https://recipegrandma.free.beeceptor.com/recommended-recipes',
  ).catch((err) => console.log(err.message));
  if (!result) {
    // Back-up from Mock if API is down
    result = await axios('https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json');
  }
  console.log(result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

async function fetchIngredientData(callback: CallbackType) {
  const result = await axios(
    'https://recipegrandma.free.beeceptor.com/ingredients',
  ).catch((err) => console.log(err.message));
  console.log('Ingredient result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  } else {
    console.log(ingredientData.data);
    callback(ingredientData.data);
  }
}

export {
  fetchRecipeData,
  fetchIngredientData,
};
export default {
  fetchRecipeData,
};
