import axios from 'axios';

/*
* If your request requires a bearer token, pass the token
* to the function from the component.
* The function will grab the data via:
*     import { useSelector } from 'react-redux';
*     import { selectCurrentToken } from './features/auth/authSlice';
* Inside the component:
*     const token = useSelector(selectCurrentToken);
* The JWT token is a string.
* Now add 'Bearer ' prior to the token for the headers.
*/

type CallbackType = (p1: Array) => void;
type Props = Int;
export type UserContext = $ReadOnly<{|
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

type RegistrationContext = $ReadOnly<{|
  email: string,
  name: string,
  password: string,
  callback?: (token: UserContext) => void
|}>;

type ReviewContext = $ReadOnly<{|
  body: string,
  stars: number,
  username: string,
  parentId: string
|}>;

export const BASE_API_URL = `${process.env.REACT_APP_API_BASE}:${process.env.REACT_APP_API_PORT || 3000}`;

export async function LoginUser(context: LoginContext): UserContext {
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
  ).catch((err) => {
    const errMsg = err.response?.data || err;
    callback?.(errMsg);
  });
  if (result) {
    callback?.(result.data);
    return result.data;
  }
}

export async function RegisterUser(context: RegistrationContext): UserContext {
  const {
    email,
    name,
    password,
    callback,
  } = context;
  const result = await axios.post(
    `${BASE_API_URL}/rgapi/user/register`,
    {
      name,
      email,
      password,
    },
  ).catch((err) => {
    const errMsg = err.response?.data || err;
    callback?.(errMsg);
  });

  if (result) {
    callback?.(result.data);
    return result.data;
  }
}

export async function fetchRecipeData(callback: CallbackType) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/recipe/all`,
  ).catch((err) => console.log(err.message));
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function fetchSingleRecipeData(recipeId: string, callback: CallbackType) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/recipe/${recipeId}`,
  ).catch((err) => console.log(err.message));
  console.log('HUSD', result);
  callback(result.data);
}

export async function fetchIngredientData(callback: CallbackType, controller?: AbortController) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/ingredient/all`,
    {
      signal: controller?.signal,
    },
  ).catch((err) => console.log(err.message));
  console.log('Ingredient api result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function searchForIngredient(
  callback: CallbackType,
  name: string,
  controller?: AbortController,
) {
  console.log('Got a name', name);
  const result = await axios(
    `${BASE_API_URL}/rgapi/ingredient/search/${name}`,
    {
      signal: controller?.signal,
    },
  ).catch((err) => console.log(err.message));
  console.log('Ingredient search api result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function searchRecipesByIngredient(
  callback: callbackType,
  data: Array,
  controller?: AbortController,
) {
  const result = await axios.post(
    `${BASE_API_URL}/rgapi/recipe/search-by-ingredients`,
    {
      ingredients: data,
    },
    {
      signal: controller?.signal,
    },
  ).catch((err) => console.log(err.message));
  console.log('Ingredient api recipe search result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function searchRecipesByName(callback: callbackType, name: string) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/recipe/recbyname/${name}`,
  ).catch((err) => console.log(err.message));
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function fetchReviewData(callback: CallbackType, props: Props) {
  console.log(props);
  const url = `${BASE_API_URL}/rgapi/review/database/`;
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

export async function postReviewData(context: ReviewContext): null {
  const {
    body,
    stars,
    username,
    parentId,
  } = context;

  const result = await axios.post(
    `${BASE_API_URL}/rgapi/review/review/create`,
    {
      body,
      stars,
      username,
      parentId,
    },
  );
  if (result) {
    return result.data;
  }
}

export async function fetchMyRecipes(callback: CallbackType) {
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

export default {
  fetchRecipeData,
  fetchIngredientData,
  fetchReviewData,
  fetchMyRecipes,
  LoginUser,
};
