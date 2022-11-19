import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import Topbar, { TopbarType } from '../../components/Topbar';
import * as Util from '../../util';
import './RecipeInDetail.css';
// import './ReviewButton.css';

function RecipeInDetailPage(): React.Node {
  const [data, setData] = useState([]);
  const [recipeName, setRecipeName] = useState('User Recipe');
  const { recipeindex } = useParams();

  console.log(recipeindex);
  const location = useLocation();
  const kitchenData = location.state?.kitchen || [`${recipeindex}`];
  const kitchen = JSON.parse(kitchenData);

  const apiCallback = (apiData) => {
    setData(apiData);
    if (apiData && apiData[recipeindex]) {
      setRecipeName(apiData[recipeindex].name);
    }
  };

  useEffect(() => {
    Util.fetchRecipeData(apiCallback);
  }, []);

  const item = data.length > 0 ? data[recipeindex] : null;

  const recipeContent = item ? (
    <RecipeDetails
      ingredients={item.ingredients}
      imageURL={item.imageURL}
      name={item.name}
      recipeIndex={recipeindex}
      steps={item.steps}
      kitchen={kitchen}
    />
  ) : null;

  return (
    <section className="rga-section">
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_WITH_BACK_BUTON}
        title={recipeName}
      />
      <section className="rga-section a_recipe_in_detail mb-5">
        {recipeContent}
      </section>
    </section>
  );
}

export default RecipeInDetailPage;
