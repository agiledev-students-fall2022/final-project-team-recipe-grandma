import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewComment/ReviewForm';
import './ReviewPage.css';
import { fetchReviewData } from '../../util';
/* Need to implement json file to correspond to each recipe */

function ReviewPage(): React.Node {
  const { recipeindex } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReviewData(setData);
    console.log(data);
  }, []);

  return (
    <div className="ReviewPage">
      <h1 className="title">{data.length >= 0 ?? data[recipeindex].name}</h1>
      <img className="foodImg" src={data.length >= 0 ? data[recipeindex].imageURL : ''} alt="Food" />
      <ReviewForm />
    </div>
  );
}

export default ReviewPage;
