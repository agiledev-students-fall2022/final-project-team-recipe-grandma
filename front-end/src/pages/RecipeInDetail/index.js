import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Recipe from '../../components/RecipeInDetail';

function RecipeInDetail(): React.Node {
  // const navigate = useNavigate();
  const { index } = useParams();
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

  // finding the index of the selected recipe
  console.log(data, index);
  return (
    <>
      {/* <h1></h1> */}
      <section className="recipes">
        <p>{data[index].ingredients}</p>
        <p>{data[index].steps}</p>
        <p>{data[index].imageURL}</p>
      </section>
    </>
  );
}

export default RecipeInDetail;
