import axios from 'axios';
import * as React from 'react';

import { useState, useEffect } from 'react';

import Recipe from '../../components/RecipeInDetail';

function RecipeInDetail(): React.Node {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json',
      );
      setData(result.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>Your Recipe</h1>
      <section className="recipes">
        {data.map((item) => (
          <Recipe key={item.name} details={item} />
        ))}
      </section>
    </>
  );
}

export default RecipeInDetail;
