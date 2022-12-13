import * as React from 'react';
import './SingleRecipeReview.css';

type Props = $ReadOnly<{|
  author: string,
  avatar: string,
  comment: string,
  rating: number
|}>;

function SingleRecipeReview(props: Props): React.Node {
  const {
    author,
    avatar,
    comment,
    rating,
  } = props;

  const remainder = rating % Math.floor(rating);
  const starValues = Array.from({ length: Math.floor(rating) }, () => 1);
  if (remainder > 0) {
    starValues.push(remainder);
  }
  while (starValues.length < 5) {
    starValues.push(0);
  }

  const recipeStars = starValues.map((val, ind) => {
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
    <div className="rg-single-review">
      <header>
        <img src={avatar} alt="avatar" />
        <div>
          <h6>{author}</h6>
          <div className="stars">
            {recipeStars}
          </div>
        </div>
      </header>
      <p>
        {comment}
      </p>
    </div>
  );
}

export default SingleRecipeReview;
