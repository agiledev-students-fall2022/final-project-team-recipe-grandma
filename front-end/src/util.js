import axios from 'axios';

type CallbackType = (p1: Array) => void;
type Props = Int;
type UserContext = $ReadOnly<{|
  _id: string,
  name: string,
  email: string,
  token: string
|}>;

type LoginContext = $ReadOnly<{|
  username: string,
  password: string,
  callback?: (token: UserContext) => void
|}>;

const BASE_API_URL = `${process.env.REACT_APP_API_BASE}:${process.env.REACT_APP_API_PORT || 3000}`;

async function LoginUser(context: LoginContext): UserContext {
  const {
    username,
    password,
    callback,
  } = context;
  const result = await axios.post(
    `${BASE_API_URL}/rgapi/user/login`,
    {
      email: username,
      password,
    },
  );
  callback?.(result.data);
  return result.data;
}

async function fetchRecipeData(callback: CallbackType) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/recipe/all`,
  ).catch((err) => console.log(err.message));
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

async function fetchIngredientData(callback: CallbackType) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/ingredients/all`,
  ).catch((err) => console.log(err.message));
  console.log('Ingredient api result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

async function fetchReviewData(callback: CallbackType, props: Props) {
  console.log(props);
  const url = `${BASE_API_URL}/rgapi/review/review/`;
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
  // need to change this after backend is done
  const result = await axios(
    `${BASE_API_URL}/rgapi/user/myrecipe`,
  ).catch((err) => console.log(err.message));
  console.log('MY RECIPES', result);
  if (result && Array.isArray(result.data)) {
    console.log('Got review data', result.data);
    callback(result.data);
  }
}

export {
  fetchRecipeData,
  fetchIngredientData,
  fetchReviewData,
  fetchMyRecipes,
  LoginUser,
};
export default {
  fetchRecipeData,
  fetchIngredientData,
  fetchReviewData,
  fetchMyRecipes,
  LoginUser,
};
