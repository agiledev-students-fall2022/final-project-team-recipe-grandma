import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../util';
import './RGRecipe.css';

type Props = $ReadOnly<{|
  author: string,
  authorID: string,
  avatarUrl?: string,
  imageUrl?: string,
  kitchenStringified?: string,
  rating?: number,
  recipeUrl: string,
  title: string
|}>;

const defaultProps = {
  avatarUrl: 'https://picsum.photos/200',
  imageUrl: 'https://www.washingtonpost.com/resizer/6mbSPgQOvUWRmmNnirvgvLzutio=/arc-anglerfish-washpost-prod-washpost/public/VA56ZXQQMUI63CHIYWG4HW5O4I.jpg',
  rating: 4.5,
  kitchenStringified: '',
};

function RGRecipe(props: Props): React.Node {
  const {
    author,
    authorID,
    avatarUrl,
    kitchenStringified,
    imageUrl,
    rating,
    recipeUrl,
    title,
  } = props;

  const navigate = useNavigate();

  if (!authorID) return null; // Remove later

  const remainder = rating % Math.floor(rating);
  const starValues = Array.from({ length: Math.floor(rating) }, () => 1);
  if (remainder > 0) {
    starValues.push(remainder);
  }
  while (starValues.length < 5) {
    starValues.push(0);
  }

  const stars = starValues.map((val, ind) => {
    if (val === 0) {
      return (
        <span key={ind} className="material-icons-outlined">
          star_outline
        </span>
      );
    }

    if (val < 1) {
      return (
        <span key={ind} className="material-icons-outlined">
          star_half
        </span>
      );
    }

    return (
      <span key={ind} className="material-icons-outlined">
        star
      </span>
    );
  });

  return (
    <div className="rg-recipe">
      <div className="rg-recipe-content">
        <button onClick={() => navigate(`../${recipeUrl}`, { state: { kitchen: kitchenStringified } })} type="button">
          <div className="rg-img-container">
            <img className="rg-recipe-cover" src={`${BASE_API_URL}/rgapi/media/${imageUrl}`} alt="recipe cover" />
            <div className="rg-blanket" />
          </div>
          <div className="mini-details">
            Rating:
            <span>
              {stars}
            </span>
          </div>
        </button>
        <div className="main-details">
          <img src={avatarUrl} alt="" className="avatar" />
          <div>
            <h6>{title}</h6>
            <p>{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
RGRecipe.defaultProps = defaultProps;

export default RGRecipe;
