import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
import Recipe from '../../components/Recipe';
import StringConfig from '../../StringConfig';
import '../../components/Recipe/aRecipeButtonStyle.css';
import './Home.css';
import * as Util from '../../util';

function Home(): React.Node {
  const [data, setData] = useState([]);

  useEffect(() => {
    Util.fetchRecipeData(setData);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* <h1>Recommended Recipes</h1> */}
      <section className="recipes container-fluid row justify-content-center">
        {data.length > 0 ? data.map((item, ind) => (
          <Recipe key={ind} details={item} onAction={() => navigate(`recipe/${ind}`)} />
        )) : StringConfig.API_FAILURE_WARNING}
      </section>
    </>
  );
}

export default Home;
