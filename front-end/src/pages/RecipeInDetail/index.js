import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../components/RecipeInDetail';
/* eslint-disable react/jsx-props-no-spreading */

function RecipeInDetail(): React.Node {
  // const navigate = useNavigate();
  const { recipeindex } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json',
      );
      console.log(result.json());
      setData(result.data);
    }
    fetchData();
  }, [data]);

  return (
    <>
      {/* <h1></h1> */}
      <section className="recipes">
        {recipeindex}
        <Recipe
          {...data[recipeindex].ingredients}
          {...data[recipeindex].steps}
          {...data[recipeindex].imageURL}
        />
      </section>
    </>
  );
}

export default RecipeInDetail;
