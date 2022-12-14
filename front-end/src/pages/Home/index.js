import { useState, useEffect } from 'react';
import * as React from 'react';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
// import Recipe from '../../components/Recipe';
import './Home.css';
import * as Util from '../../util';
import StringConfig from '../../StringConfig';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGRecipe from '../../components/RGRecipe';
import RGBaseSearchBar from '../../components/RGBaseSearchBar';
import LoadingIcon from '../../components/LoadingIcon';

function Home(): React.Node {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Util.fetchRecipeData((apiData) => {
      setIsLoading(false);
      setData(apiData);
    });
  }, []);

  const onSearchAction = (searchText) => {
    const sanitizedText = searchText.toLowerCase().replace(' ', '-');
    setIsLoading(true);
    const apiCallback = (apiData) => {
      setIsLoading(false);
      setData(apiData);
    };
    Util.searchRecipesByName(apiCallback, sanitizedText);
  };
  const loadingOrFail = isLoading ? <LoadingIcon /> : StringConfig.API_FAILURE_WARNING;
  console.log('Recipes', data, isLoading);

  return (
    <>
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_WITH_BACK_BUTON}
        title="Choose your recipes"
      />
      {/* <h1>Recommended Recipes</h1> */}
      <section className="rga-section recipes-section justify-content-center">
        <div className="container d-flex justify-content-center rg-recipes-search">
          <RGBaseSearchBar
            onAction={onSearchAction}
            placeholder="Search for recipes"
            triggerOnChange={false}
          />
        </div>
        <div className="recipes">
          {data.length > 0 && !isLoading ? data.map((item, ind) => (
            <RGRecipe
              key={ind}
              author={item.author}
              authorID={item.userId}
              imageUrl={item.cover}
              rating={item.rating}
              recipeUrl={`/recipe/${item._id}`}
              title={item.name}
              likes={item.likes}
            />
          )) : loadingOrFail}
        </div>
      </section>
    </>
  );
}

export default Home;
