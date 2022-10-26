import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import RGButton from '../RGButton';

import './RecipeDetails.css';

type Ingredient = $ReadOnly<{|
  name: string,
  quantity: int
|}>;

type Props = $ReadOnly<{|
  name: string,
  imageURL: string,
  ingredients: Array<Ingredient>,
  steps: Array<string>,
  recipeIndex: int
|}>;

function RecipeDetails(props: Props): React.Node {
  const {
    name,
    imageURL,
    ingredients,
    recipeIndex,
    steps,
  } = props;

  const navigate = useNavigate();

  return (
    <div className="recipe-content container-fluid">
      <div className="container row">
        <h3>{name}</h3>
        <div className="col-12 col-md-6">
          <img src={imageURL} className="recipe-detail-image" alt="RecipeImage" />
        </div>
        <div className="col-12 col-md-6">
          <h4>Ingredients</h4>
          <ul>
            {
            ingredients.map((ing, i) => (
              <li key={i}>
                {ing.name}
                &nbsp;
                -
                &nbsp;
                {ing.quantity}
              </li>
            ))
            }
          </ul>
          <h4>Directions</h4>
          {steps.map((step, i) => (
            <div key={i} className="recipe-step">
              <h5>
                <strong>
                  Step
                  &nbsp;
                  {i + 1}
                </strong>
              </h5>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <RGButton
        onAction={() => navigate(`/review/${recipeIndex}`)}
        text="Review"
      />
    </div>
  );
}

export default RecipeDetails;
