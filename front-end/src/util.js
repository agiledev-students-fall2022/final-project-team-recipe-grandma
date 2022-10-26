import axios from 'axios';

type CallbackType = (p1: Array) => void;

async function fetchRecipeData(callback: CallbackType) {
  let result = await axios(
    'https://recipegrandma.free.beeceptor.com/recommended-recipes',
  ).catch((err) => console.log(err.message));
  if (!result) {
    // Back-up from Mock if API is down
    result = await axios('https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json');
  }
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export { fetchRecipeData };
export default {
  fetchRecipeData,
};
