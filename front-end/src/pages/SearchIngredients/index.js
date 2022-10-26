import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import SearchBar from '../../components/SearchBar';
import IngredientsList from '../../components/IngredientsList/IngredientsList';
import './SearchIngredients.css';

function SearchIngredients(): React.Node {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [ingredients, setIngredients] = useState([]);

  const addIngredients = (item) => {
    setIngredients((current) => [...current, item]);
  };

  const removeItem = (index) => {
    setIngredients((oldState) => oldState.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="back-btn-container">
        <CustomButton className="back-btn" text="Back" onAction={goBack} />
      </div>
      <SearchBar onAction={addIngredients} />
      <IngredientsList onAction={removeItem} ingredients={ingredients} />
    </div>
  );
}

export default SearchIngredients;
