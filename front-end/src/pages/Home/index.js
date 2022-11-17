import { useState, useEffect } from 'react';
import * as React from 'react';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
// import Recipe from '../../components/Recipe';
import StringConfig from '../../StringConfig';
import '../../components/Recipe/aRecipeButtonStyle.css';
import './Home.css';
import * as Util from '../../util';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGRecipe from '../../components/RGRecipe';
import RGBaseSearchBar from '../../components/RGBaseSearchBar';

function Home(): React.Node {
  const [data, setData] = useState([]);

  useEffect(() => {
    Util.fetchRecipeData(setData);
  }, []);

  console.log(data);

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
            placeholder="Search for recipes"
          />
        </div>
        <div className="recipes">
          {data.length > 0 ? data.map((item, ind) => (
            // <Recipe key={ind} details={item} onAction={() => navigate(`recipe/${ind}`)} />
            <RGRecipe
              key={ind}
              author="Chadwick Boseman"
              authorID="1"
              imageUrl={item.imageURL}
              recipeUrl={`recipe/${ind}`}
              title={item.name}
            />
          )) : StringConfig.API_FAILURE_WARNING}
        </div>
      </section>
    </>
  );
}

export default Home;
