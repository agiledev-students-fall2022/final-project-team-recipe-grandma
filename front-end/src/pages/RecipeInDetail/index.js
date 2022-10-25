import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../../temp_recipedata.json';
import './RecipeInDetail.css';
// import './ReviewButton.css';

function RecipeInDetailPage(): React.Node {
  // const navigate = useNavigate();
  const { recipeindex } = useParams();
  const navigate = useNavigate();

  return (
    <article className="a_recipe_in_detail">
      <h3>{data[recipeindex].name}</h3>
      <img src={data[recipeindex].imageURL} className="centerImage" alt="RecipeImage" />
      <h4>Ingredients</h4>
      {
      data[recipeindex].ingredients.map((ing, i) => (
        <p key={i}>
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

      <article className="ReviewButton">
        <button type="button" onClick={() => navigate(`/${recipeindex}/review`)}>
          Review
        </button>
      </article>
    </article>
  );
}

export default RecipeInDetailPage;
