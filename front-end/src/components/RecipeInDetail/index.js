import * as React from 'react';
import './RecipeInDetail.css';

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

function RecipeInDetail(props: Props): React.Node {
  const { details } = props;
  return (
    <article className="a_recipe_in_detail">
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
      <img src={details.imageURL} className="centerImage" alt="RecipeImage" />
    </article>
  );
}

export default RecipeInDetail;
