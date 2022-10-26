import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import data from '../../temp_recipedata.json';
import './RecipeInDetail.css';
// import './ReviewButton.css';

function RecipeInDetailPage(): React.Node {
  const { recipeindex } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <article className="a_recipe_in_detail">
      <div className="back-btn-container">
        <CustomButton className="back-btn" text="Back" onAction={goBack} />
      </div>
      {/* added a div here and moved rest of the elements inside to make styling for btn easier */}
      <div className="recipe-content">
        <h3>{data[recipeindex].name}</h3>
        <img src={data[recipeindex].imageURL} className="centerImage" alt="RecipeImage" />
        <h4>Ingredients</h4>
        {
        data[recipeindex].ingredients.map((ing, i) => (
          <p key={i}>
            {ing.name}
            &nbsp;
            -
            &nbsp;
            {ing.quantity}
          </p>
        ))
        }
        <h4>Steps</h4>
        <h5>{data[recipeindex].steps}</h5>

        <article className="ReviewButton">
          <button type="button" onClick={() => navigate(`/${recipeindex}/review`)}>
            Review
          </button>
        </article>
      </div>
    </article>
  );
}

export default RecipeInDetailPage;
