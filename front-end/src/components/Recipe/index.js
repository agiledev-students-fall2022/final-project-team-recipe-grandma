import * as React from 'react';
import './Recipe.css';

type Ingredient = $ReadOnly<{|
  name: string,
  quantity: string,
  type: string
|}>;

type Props = $ReadOnly<{|
  details: {
    index: number,
    name: string,
    ingredients: Array<Ingredient>,
    steps: Array<string>,
    imageURL: string
  },
  onAction: () => void
|}>;

function Recipe(props: Props): React.Node {
  const {
    details,
    onAction,
  } = props;
  return (
    <button
      onClick={onAction}
      type="button"
      className="recipe container mx-auto col-md-5 col-12 d-flex card"
    >
      <img src={details.imageURL} alt="Recipe" className="card-img-top" />
      <div className="card-body d-flex justify-content-center">
        <h3 className="card-title">{details.name}</h3>
      </div>
    </button>
  );
}

export default Recipe;
