import axios from 'axios';

const ingredientData = require('./ingredients_backup.json');
const profileRecipeDataFallback = require('./myRecipeTemp.json');
const recipeData = require('./temp_recipedata.json');

type CallbackType = (p1: Array) => void;
type Props = Int;

async function fetchRecipeData(callback: CallbackType) {
  const url = 'http://localhost:8000/rgapi/recipe/recipelist';
  let result = await axios.get(
    url,
  ).catch((err) => console.log(err.message));
  console.log(result.data);
  if (result && Array.isArray(result.data)) {
    console.log('Got recipe data', result.data);
    callback(result.data);
  } else {
    result = recipeData;
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
    callback(ingredientData.data);
  }
}

async function fetchReviewData(callback: CallbackType, props: Props) {
  console.log(props);
  const url = 'http://localhost:8000/rgapi/review/review/';
  const fullUrl = url.concat('', props);
  let result = await axios.get(
    fullUrl,
  ).catch((err) => console.log(err.message));
  console.log(result);
  if (result && Array.isArray(result.data.reviews)) {
    console.log('Got review data', result.data.reviews);
    callback(result.data.reviews);
  } else {
    result = await axios('https://raw.githubusercontent.com/geontackee/sample_reviews/main/Reviews.json');
    callback(result.data);
  }
}

async function fetchMyRecipes(callback: CallbackType) {
  const result = await axios(
    'https://myrecipes.free.beeceptor.com/myrecipe',
  ).catch((err) => console.log(err.message));
  if (result && Array.isArray(result.data)) {
    console.log('Got review data', result.data);
    callback(result.data);
  } else {
    callback(profileRecipeDataFallback.data);
  }
}

export {
  fetchRecipeData,
  fetchIngredientData,
  fetchReviewData,
  fetchMyRecipes,
};
export default {
  fetchRecipeData,
  fetchIngredientData,
  fetchReviewData,
  fetchMyRecipes,
};
