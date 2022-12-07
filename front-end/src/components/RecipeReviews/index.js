import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { TestReviewComment } from '../../../../back-end/controllers/ReviewCommentController';
import { fetchReviewData, postReviewData } from '../../util';
import { selectUser } from '../../features/auth/authSlice';

import RGButton from '../RGButton';
import SingleRecipeReview from '../SingleRecipeReview';
import './RecipeReviews.css';

type Props = $ReadOnly<{|
  recipeRating: number,
  recipeId: string | number
|}>;

function RecipeReviews(props: Props): React.Node {
  const [commentText, setCommentText] = useState('');
  const [ratingNum, setRatingNum] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsgVisible, setErrorMsgVisible] = useState(false);
  const errorMsg = 'Review is emtpy';
  const user = useSelector(selectUser);
  const {
    recipeRating,
    recipeId,
  } = props;

  useEffect(() => {
    const apiCallback = (apiData) => {
      setReviews(apiData);
      setRatingCount(apiData.length);
    };
    fetchReviewData(apiCallback, recipeId, `Bearer ${user.token}`);
  }, []);

  const handleReviewPost = () => {
    if (commentText !== '') {
      setErrorMsgVisible(false);
      const reviewCallback = () => {
        console.log('Review Uploaded');
        setIsUploading(false);
      };
      setReviews((currReviews) => [...currReviews, {
        body: commentText,
        username: user.name,
        stars: ratingNum,
        parentId: recipeId,
      }]);
      setIsUploading(true);
      setRatingCount(reviews.length + 1);
      postReviewData(
        reviewCallback,
        {
          body: commentText,
          username: user.name,
          stars: ratingNum,
          parentId: recipeId,
        },
        `Bearer ${user.token}`,
      );
    } else {
      setErrorMsgVisible(true);
    }
  };

  const errorNotifyComponent = !errorMsgVisible ? null : (
    <p className="rg-review-error"><strong>{errorMsg}</strong></p>
  );

  console.log(commentText, reviews);

  const remainder = recipeRating % Math.floor(recipeRating);
  const starValues = Array.from({ length: Math.floor(recipeRating) }, () => 1);
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

  const onStarClicked = (rating) => {
    setRatingNum(rating);
  };

  const editableStarValues = Array.from({ length: 5 }, () => 1);
  const editableStars = editableStarValues.map((val, ind) => {
    const starIcon = (ind + 1) <= ratingNum ? 'star' : 'star_outline';
    return (
      <button
        className="rg-review-star"
        key={ind}
        onClick={() => onStarClicked(ind + 1)}
        type="button"
      >
        <span className="material-icons-outlined">
          {starIcon}
        </span>
      </button>
    );
  });

  const userReviews = reviews.map((rev, ind) => (
    <SingleRecipeReview
      key={ind}
      author={rev.username}
      avatar="https://picsum.photos/200"
      comment={rev.body}
      rating={rev.stars}
    />
  ));

  return (
    <section className="rg-review">
      <h1>Share Your Opinion</h1>
      <div className="star-ratings">
        {editableStars}
      </div>
      {errorNotifyComponent}
      <div className="submission-form">
        <h6>Comment</h6>
        <textarea
          name="rgReviewComment"
          id="rgReviewComment"
          cols="30"
          rows="5"
          onChange={(ev) => setCommentText(ev.target.value)}
          placeholder="Write a comment..."
        />
        <RGButton
          isBoxed
          text="Post"
          onAction={handleReviewPost}
          disabled={isUploading}
        />
      </div>
      <div className="stars-cont">
        <h3 className="recipe-avg">{Math.round(recipeRating * 10) / 10}</h3>
        <div className="recipe-stars-cont">
          {recipeStars}
        </div>
        <p>
          {ratingCount}
          &nbsp;people have given a rating
        </p>
      </div>
      <section className="comments">
        {userReviews}
      </section>
    </section>
  );
}

export default RecipeReviews;
