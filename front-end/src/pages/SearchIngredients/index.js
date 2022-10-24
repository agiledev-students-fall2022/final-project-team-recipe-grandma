import * as React from 'react';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import IngredientsList from '../../components/IngredientsList/IngredientsList';

function SearchIngredients(): React.Node {
  const [ingredients, setIngredients] = useState([]);

  const addIngredients = (item) => {
    setIngredients((current) => [...current, item]);
  };

  const removeItem = (index) => {
    setIngredients((oldState) => oldState.filter((_, i) => i !== index));
  };

  return (
    <div>
      <SearchBar onAction={addIngredients} />
      <IngredientsList onAction={removeItem} ingredients={ingredients} />
    </div>
  );
}

export default SearchIngredients;
