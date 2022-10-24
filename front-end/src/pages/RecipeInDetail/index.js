import * as React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../temp_recipedata.json';
import './RecipeInDetail.css';

function OnePageRecipeInDetail(): React.Node {
  const { recipeindex } = useParams();

  return (
    <article className="a_recipe_in_detail">
      <h3>{data[recipeindex].name}</h3>
      <img src={data[recipeindex].imageURL} className="centerImage" alt="RecipeImage" />
      <h4>Ingredients</h4>
      {
      data[recipeindex].ingredients.map((ing) => (
        <p>
          {ing.name}
          &nbsp;
          -
          &nbsp;
          {ing.quantity}
        </p>
      ))
      }
      <h4>Steps</h4>
      <h5>{data[recipeindex].steps}</h5>
    </article>
  );
}

export default OnePageRecipeInDetail;
