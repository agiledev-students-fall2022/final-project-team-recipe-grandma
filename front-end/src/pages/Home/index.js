// import axios from 'axios';

import * as React from 'react';
// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
import data from '../../temp_recipedata.json';

import Recipe from '../../components/Recipe';
import '../../components/Recipe/aRecipeButtonStyle.css';

function Home(): React.Node {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios(
  //       'https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json',
  //     );
  //     setData(result.data);
  //   }
  //   fetchData();
  // }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* <h1>Recommended Recipes</h1> */}
      <section className="recipes">
        {data.map((item) => (
          <article className="aRecipeButton">
            <button type="button" onClick={() => navigate(`/${item.index}`)}>
              <Recipe key={item.name} details={item} />
            </button>
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;
