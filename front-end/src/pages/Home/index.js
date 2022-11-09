import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// fetched all data from the API below into a file: '../../temp_recipedata.json'
import Recipe from '../../components/Recipe';
// import StringConfig from '../../StringConfig';
import '../../components/Recipe/aRecipeButtonStyle.css';
import './Home.css';
import { fetchRecipeData } from '../../util';

function Home(): React.Node {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRecipeData(setData);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* <h1>Recommended Recipes</h1> */}
      <section className="recipes container-fluid row justify-content-center">
        <h1 className="mb-5"><strong>Select Your Recipes</strong></h1>
        {data.map((item) => (
          <Recipe key={item.index} details={item} onAction={() => navigate(`recipe/${item.index}`)} />
        ))}
      </section>
    </>
  );
}

export default Home;
