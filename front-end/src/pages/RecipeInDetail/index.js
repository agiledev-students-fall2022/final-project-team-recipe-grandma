import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import CustomButton from '../../components/CustomButton';
import * as Util from '../../util';
import './RecipeInDetail.css';
// import './ReviewButton.css';

function RecipeInDetailPage(): React.Node {
  const [data, setData] = useState([]);
  const { recipeindex } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    Util.fetchRecipeData(setData);
  }, []);

  const item = data.length > 0 ? data[recipeindex] : null;

  const recipeContent = item ? (
    <RecipeDetails
      ingredients={item.ingredients}
      imageURL={item.imageURL}
      name={item.name}
      recipeIndex={recipeindex}
      steps={item.steps}
    />
  ) : null;

  return (
    <article className="a_recipe_in_detail mb-5">
      {/* Back button currently not viewable due to CSS. Also should be in navbar */}
      <div className="back-btn-container">
        <CustomButton className="back-btn" text="Back" onAction={goBack} />
      </div>
      {recipeContent}
    </article>
  );
}

export default RecipeInDetailPage;
