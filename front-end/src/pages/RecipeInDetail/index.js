import * as React from 'react';
import { useParams, useLocation, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import Topbar, { TopbarType } from '../../components/Topbar';
import LoadingIcon from '../../components/LoadingIcon';
import * as Util from '../../util';
import './RecipeInDetail.css';
import { selectUser } from '../../features/auth/authSlice';
// import './ReviewButton.css';

// type Props = $ReadOnly<{|
// |}>

function RecipeInDetailPage({ match }: RouteComponentProps): React.Node {
  const [data, setData] = useState();
  const [recipeName, setRecipeName] = useState('User Recipe');
  const { recipeId } = useParams();

  const user = useSelector(selectUser);

  const location = useLocation();
  const kitchenData = location.state?.kitchen || [{ name: `${recipeId}` }];
  console.log(match, recipeId, kitchenData);
  const kitchenArr = location.state?.kitchen ? JSON.parse(kitchenData) : kitchenData;
  const kitchen = kitchenArr.map((x) => x.name);

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
      kitchen={kitchen}
      recipeId={recipeId}
      rating={data.rating}
      steps={data.steps}
      likes={data.likes}
    />
  ) : <LoadingIcon />;

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
