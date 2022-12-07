import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import RecipeReviews from '../RecipeReviews';
import RGButton from '../RGButton';
import RGSwipableModal from '../RGSwipableModal';
import {
  BASE_API_URL,
  postLike,
  fetchRecipeLikes,
  deleteLike,
} from '../../util';
import './RecipeDetails.css';

type Ingredient = $ReadOnly<{|
  _id: string,
  name: string,
  quantity: int,
  unit: string,
  type: string
|}>;

type Props = $ReadOnly<{|
  imageURL: string,
  ingredients: Array<Ingredient>,
  kitchen?: Array<string>,
  steps: Array<string>,
  name: string,
  recipeId: string,
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
    recipeId,
    name,
    steps,
    rating,
  } = props;
  const [isModalClosed, setModalClosed] = useState(true);
  const [recipeLikes, setRecipeLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const likeCallback = (data) => {
      setRecipeLikes(data.length);
      const checkData = (item) => {
        if (item.userId === user._id) {
          setIsLiked(true);
        }
      };
      data.map(checkData);
    };
    fetchRecipeLikes(likeCallback, recipeId);
  }, []);

  const handleLike = () => {
    const postCallback = () => {
      console.log('Like uploaded');
    };
    const deleteCallback = () => {
      console.log('Like deleted');
    };

    if (isLiked) {
      deleteLike(
        deleteCallback,
        {
          recipeId,
        },
        `Bearer ${user.token}`,
      );
      setIsLiked(false);
    } else {
      postLike(
        postCallback,
        {
          parentId: recipeId,
        },
        `Bearer ${user.token}`,
      );
      setIsLiked(true);
    }
  };

  const ratingPercentage = Math.ceil(rating * 20);

  const ingredientElements = ingredients.map((ing, i) => {
    const className = kitchen && kitchen.length > 0 && !kitchen.includes(ing.name) ? 'rg-sr-ing' : 'rg-sr-ing ing-in-kitch';
    return (
      <li key={i} className={className}>
        {ing.name || ''}
        &nbsp;
        |
        &nbsp;
        {`${ing.quantity} ${ing.unit}` || '1 cup'}
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
      <img src={`${BASE_API_URL}/rgapi/media/${imageURL}`} alt="recipe" className="rg-sr-img" />
      <section className="rg-sr-header">
        <section className="rg-sr-sec rg-sr-stats">
          <span className="material-icons-outlined">
            star
          </span>
          <div>
            <p>Average of</p>
            <h6>
              {ratingPercentage}
              % approval rating
            </h6>
          </div>
          <span className="material-icons-outlined">favorite</span>
          <div>
            <p>Received around</p>
            <h6>
              {recipeLikes}
              &nbsp;
              likes
            </h6>
          </div>
        </section>
        <button
          className="like-btn"
          onClick={handleLike}
          type="button"
        >
          <span className="material-icons">favorite</span>
        </button>
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
          recipeId={recipeId}
        />
      </RGSwipableModal>
    </div>
  );
}

RecipeDetails.defaultProps = defaultProps;

export default RecipeDetails;
