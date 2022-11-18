import { useState, useEffect } from 'react';
import * as React from 'react';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
// import Recipe from '../../components/Recipe';
import StringConfig from '../../StringConfig';
import './Home.css';
import * as Util from '../../util';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGRecipe from '../../components/RGRecipe';
import RGBaseSearchBar from '../../components/RGBaseSearchBar';

function Home(): React.Node {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const apiCallback = (apiData) => {
      const mutatedData = apiData.map((rec, ind) => {
        const newRec = { ...rec, index: ind };
        return newRec;
      });
      setData(mutatedData);
      setFilteredData(mutatedData);
    };

    Util.fetchRecipeData(apiCallback);
  }, []);

  const onSearchAction = (searchText) => {
    const newFilteredData = data.filter((recipe) => recipe.name
      .toLowerCase().includes(
        searchText.toLowerCase(),
      ));
    setFilteredData(newFilteredData);
  };

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
          />
        </div>
        <div className="recipes">
          {filteredData.length > 0 ? filteredData.map((item, ind) => (
            // <Recipe key={ind} details={item} onAction={() => navigate(`recipe/${ind}`)} />
            <RGRecipe
              key={ind}
              author="Chadwick Boseman"
              authorID="1"
              imageUrl={item.imageURL}
              recipeUrl={`/recipe/${item.index}`}
              title={item.name}
            />
          )) : StringConfig.API_FAILURE_WARNING}
        </div>
      </section>
    </>
  );
}

export default Home;
