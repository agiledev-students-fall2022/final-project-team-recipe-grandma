import * as React from 'react';
import { useState } from 'react';
import RecipeReviews from '../RecipeReviews';
import RGButton from '../RGButton';
import RGSwipableModal from '../RGSwipableModal';
import './RecipeDetails.css';

type Ingredient = $ReadOnly<{|
  name: string,
  quantity: int
|}>;

type Props = $ReadOnly<{|
  imageURL: string,
  ingredients: Array<Ingredient>,
  kitchen?: Array<string>,
  steps: Array<string>,
  name: string,
  recipeIndex: int,
  rating?: float
|}>;

const defaultProps = {
  kitchen: [],
  rating: 4,
};

function RecipeDetails(props: Props): React.Node {
  const {
    imageURL,
    ingredients,
    kitchen,
    recipeIndex,
    name,
    steps,
    rating,
  } = props;
  const [isModalClosed, setModalClosed] = useState(true);

  const ratingPercentage = rating * 20;

  const ingredientElements = ingredients.map((ing, i) => {
    const className = kitchen && kitchen.length > 0 && !kitchen.includes(ing.name) ? 'rg-sr-ing' : 'rg-sr-ing ing-in-kitch';
    return (
      <li key={i} className={className}>
        {ing.name}
        &nbsp;
        |
        &nbsp;
        {ing.quantity}
      </li>
    );
  });

  const instructionElements = steps.map((step, i) => (
    <div key={i} className="rg-sr-step">
      <h5>
        <strong>
          {i + 1}
          .
        </strong>
      </h5>
      <p>{step}</p>
    </div>
  ));

  return (
    <div className="rg-sr-main container-fluid">
      <h1><strong>{name}</strong></h1>
      <img src={imageURL} alt="recipe" className="rg-sr-img" />
      <section className="rg-sr-sec rg-sr-stats">
        <span className="material-icons-outlined">
          star
        </span>
        <div>
          <p>Average of</p>
          <h6>
            {ratingPercentage}
            approval rating
          </h6>
        </div>
      </section>
      <section className="rg-sr-sec rg-sr-ingredients">
        <h4>Ingredients</h4>
        <ul className="rg-sr-ing-list">
          {ingredientElements}
        </ul>
      </section>
      <section className="rg-sr-sec rg-sr-directions">
        <h4>Preparation Steps:</h4>
        {instructionElements}
      </section>
      <div className="btn-container">
        <RGButton
          onAction={() => setModalClosed(false)}
          text="Submit a review"
        />
      </div>
      <RGSwipableModal
        openModal={!isModalClosed}
        onClose={() => setModalClosed(true)}
      >
        <RecipeReviews
          overflowEndState="scroll"
          recipeRating={rating}
          recipeId={recipeIndex}
        />
      </RGSwipableModal>
    </div>
  );
}

RecipeDetails.defaultProps = defaultProps;

export default RecipeDetails;
