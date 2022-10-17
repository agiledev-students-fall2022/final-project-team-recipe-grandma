import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import './App.css';

function App(): React.Node {
  const [data, setData] = useState([]);

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
          <Recipe key={item.name} details={item} />
        ))}
      </section>
    </>
  );
}

export default App;
