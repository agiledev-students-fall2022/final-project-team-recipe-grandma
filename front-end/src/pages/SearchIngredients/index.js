import * as React from 'react';
import SearchBar from '../../components/SearchBar';
import IngredientsList from '../../components/IngredientsList/IngredientsList';

// type Props = { };

function SearchIngredients(): React.Node {
  return (
    <div>
    <SearchBar />
    <IngredientsList />
    </div>
  );
}

export default SearchIngredients;
