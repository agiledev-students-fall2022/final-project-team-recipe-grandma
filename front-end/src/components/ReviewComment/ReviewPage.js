import * as React from 'react';
import ReviewForm from './ReviewForm';
import './ReviewPage.css';
// import RecipeInDetail from '../RecipeInDetail/index';
import placeholderFood from './placeholder_food.jpg';

// Will probably need to add Props later.
function ReviewPage(): React.Node {
  return (
    <div className="ReviewPage">
      <h1 className="title">Recipe Title</h1>
      <img className="foodImg" src={placeholderFood} alt="Placeholder food" />
      <ReviewForm />
    </div>
  );
}

export default ReviewPage;
