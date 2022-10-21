import * as React from 'react';
import './Recipe.css';

type Ingredient = $ReadOnly<{|
  name: string,
  quantity: string,
  type: string
|}>;

type Props = $ReadOnly<{|
  details: {
    name: string,
    ingredients: Array<Ingredient>,
    steps: Array<string>,
    imageURL: string
  }
|}>;

function Recipe(props: Props): React.Node {
  const { details } = props;
  return (
    <article className="recipe">
      <h3>{details.name}</h3>
      <h4>Ingredients</h4>
      {
      details.ingredients.map((ing) => (
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
      <h5>{details.steps}</h5>
      {/* <img src={details.imageURL} alt="RecipeImage" /> */}
    </article>
  );
}

export default Recipe;
