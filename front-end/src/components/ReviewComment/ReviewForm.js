import * as React from 'react';
import RGButton from '../RGButton';
import './ReviewForm.css';

function ReviewForm(): React.Node {
  return (
    <div className="ReviewForm">
      <h1>Write Your Review</h1>
      <textarea
        type="text"
        placeholder="Write down your review"
      />
      <label htmlFor="starRatingReview">
        <input type="number" max="5" min="0" id="starRatingReview" />
        Leave a score
      </label>
      <br />
      <RGButton
        text="Submit"
        onAction={() => false}
        width="auto"
      />
    </div>
  );
}

export default ReviewForm;
