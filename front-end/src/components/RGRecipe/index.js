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
  title: string,
  likes: number
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
    likes,
  } = props;

  const navigate = useNavigate();

  console.log('Tf');

  if (!authorID) return null; // Remove later

  // const formatLikeCounter = (value) => {
  //   const { length } = (`${Math.abs(parseInt(value, 10))}`);
  //   const index = Math.ceil((length - 3) / 3);
  //   const suffix = ['K', 'M', 'B', 'T'];

  //   if (length < 4) return value;

  //   return (value / (index ** 1000))
  //     .toFixed(1)
  //     .replace(/\.0$/, '') + suffix[index - 1];
  // };

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
            <div className="rating-box">
              Rating:
              <span>
                {stars}
              </span>
            </div>
            <div className="like-counter">
              <span className="material-icons like-icon">favorite</span>
              <span>
                {likes ? Intl.NumberFormat('en', { notation: 'compact' }).format(likes) : 0}
              </span>
            </div>
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
