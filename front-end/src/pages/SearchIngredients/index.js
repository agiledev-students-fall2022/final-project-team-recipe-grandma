import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../../components/CustomButton';
import SearchBar from '../../components/SearchBar';
import IngredientsList from '../../components/IngredientsList/IngredientsList';
import RGButton from '../../components/RGButton';
import RGRecipe from '../../components/RGRecipe';
import './SearchIngredients.css';
import { fetchRecipeData } from '../../util';

function SearchIngredients(): React.Node {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [ingredients, setIngredients] = useState([]);
  const [reccs, setReccs] = useState([]);

  useEffect(() => {
    fetchRecipeData(setData);
  }, []);

  const addIngredients = (item) => {
    setIngredients((current) => [...current, item]);
  };

  const removeItem = (index) => {
    setIngredients((oldState) => oldState.filter((_, i) => i !== index));
  };

  const filterRecipeReccs = () => {
    if (!data || data.length <= 0) return;
    const filteredRecipes = [];
    const newRecipes = data.filter((rec, ind) => {
      const filteredVals = rec.ingredients.map((ing) => ing.name);
      for (let j = 0; j <= ingredients.length; j++) {
        if (filteredVals.includes(ingredients[j])) {
          filteredRecipes.push({ ...rec, originalIndex: ind });
          return true;
        }
      }
      return false;
    });
    setReccs(filteredRecipes);
    return newRecipes;
  };

  const loadRecommendations = () => {
    filterRecipeReccs();
  };

  return (
    <div>
      <div className="back-btn-container">
        <CustomButton className="back-btn" text="Back" onAction={goBack} />
      </div>
      <SearchBar onAction={addIngredients} />
      <IngredientsList onAction={removeItem} ingredients={ingredients} />
      <RGButton
        text="Search for Ingredients"
        onAction={() => loadRecommendations()}
        width="auto"
      />
      <h5>Recommended Recipes</h5>
      {reccs.map((rec, ind) => (
        <RGRecipe
          key={ind}
          details={rec}
          onAction={() => navigate(`/recipe/${rec.originalIndex}`)}
        />
      ))}
    </div>
  );
}

export default SearchIngredients;
