import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import Topbar, { TopbarType } from '../../components/Topbar';
import * as Util from '../../util';
import './RecipeInDetail.css';
import { selectUser } from '../../features/auth/authSlice';
// import './ReviewButton.css';

function RecipeInDetailPage(): React.Node {
  const [data, setData] = useState();
  const [recipeName, setRecipeName] = useState('User Recipe');
  const { recipeId } = useParams();

  const user = useSelector(selectUser);

  console.log(recipeId);
  const location = useLocation();
  const kitchenData = location.state?.kitchen || [`${recipeId}`];
  console.log(recipeId);
  const kitchen = location.state?.kitchen ? JSON.parse(kitchenData) : kitchenData;

  const apiCallback = (apiData) => {
    setData(apiData);
    if (apiData) {
      setRecipeName(apiData.name);
    }
  };

  useEffect(() => {
    Util.fetchSingleRecipeData(recipeId, apiCallback, `Bearer ${user.token}`);
  }, []);

  console.log('LSDSLDLS', data);

  const recipeContent = data ? (
    <RecipeDetails
      ingredients={data.ingredients}
      imageURL={data.cover}
      name={data.name}
      recipeId={recipeId}
      rating={data.rating}
      steps={data.steps}
      kitchen={kitchen}
      likes={data.likes}
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
