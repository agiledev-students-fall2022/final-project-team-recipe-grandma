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

export async function fetchIngredientData(callback: CallbackType) {
  const result = await axios(
    `${BASE_API_URL}/rgapi/ingredients/all`,
  ).catch((err) => console.log(err.message));
  console.log('Ingredient api result', result);
  if (result && Array.isArray(result.data)) {
    callback(result.data);
  }
}

export async function fetchReviewData(callback: CallbackType, props: Props) {
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
