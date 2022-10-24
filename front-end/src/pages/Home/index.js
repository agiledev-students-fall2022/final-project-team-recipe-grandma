import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import filedjson from '../../temp_recipedata.json';

import Recipe from '../../components/Recipe';

function Home(): React.Node {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const routeChange = (item) => {
    const index = filedjson.indexOf(item);
    navigate('/${index}');
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios( // found a recipe database with ingredients + cooking steps
      // but it gives me an error message
      // "If this is valid SVG, it's probably a bug in svg-parser."
        'https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json',
      );
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Recommended Recipes</h1>
      <section className="recipes">
        {data.map((item) => (
          <button type="button" onClick={routeChange()}>
            <Recipe key={item.name} details={item} />
          </button>
        ))}
      </section>
    </>
  );
}

export default Home;
