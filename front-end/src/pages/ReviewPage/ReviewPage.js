import * as React from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewComment/ReviewForm';
import data from '../../temp_recipedata.json';
import './ReviewPage.css';
import placeholderFood from './placeholder_food.jpg';
/* Need to implement json file to correspond to each recipe */

function ReviewPage(): React.Node {
  const { recipeindex } = useParams();

  return (
    <div className="ReviewPage">
      <h1 className="title">{data[recipeindex].name}</h1>
      <img className="foodImg" src={data[recipeindex].imageURL} alt={placeholderFood} />
      <ReviewForm />
    </div>
  );
}

export default ReviewPage;
