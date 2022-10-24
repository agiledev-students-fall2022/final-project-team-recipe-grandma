import axios from 'axios';

import * as React from 'react';
import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

import Recipe from '../../components/Recipe';

function Home(): React.Node {
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

  // function selectedRecipe(item) {
  //   const navigate = useNavigate();
  //   const { item } = useParams();
  // }

  // return (
  //   <>
  //     <h1>Recommended Recipes</h1>
  //     <section className="recipes">
  //       <button onClick={() => selectedRecipe(item)}>
  //         {data.map((item) => (
  //           <Recipe key={item.name} details={item} />
  //         ))}
  //       </button>
  //     </section>
  //   </>
  // );

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

export default Home;
