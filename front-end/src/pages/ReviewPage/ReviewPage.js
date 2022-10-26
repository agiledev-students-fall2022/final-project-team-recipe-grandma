import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewComment/ReviewForm';
import SingleReview from '../../components/ReviewComment/SingleReview';
import './ReviewPage.css';
import { fetchReviewData, fetchRecipeData } from '../../util';
/* Need to implement json file to correspond to each recipe */

function ReviewPage(): React.Node {
  const { recipeindex } = useParams();
  const [data, setData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetchRecipeData(setData);
    fetchReviewData(setReviewData);
  }, []);

  return (
    <div className="ReviewPage">
      <h1 className="title">{data.length > 0 ? data[recipeindex].name : null}</h1>
      <img className="foodImg" src={data.length > 0 ? data[recipeindex].imageURL : 'https://picsum.photos/200/300?random=1'} alt="Food" />
      <div className="d-flex justify-content-center row">
        <h3 className="col-12 text-center"><strong className="mx-auto">Reviews</strong></h3>
        <br />
        <div className="column text-align-center col-md-4 col-12">
          {reviewData.map((review, ind) => (
            <SingleReview key={ind} review={review} />
          ))}
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
