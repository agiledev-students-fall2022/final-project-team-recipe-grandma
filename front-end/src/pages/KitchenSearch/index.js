import * as React from 'react';
import { useEffect, useState } from 'react';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGBaseSearchBar from '../../components/RGBaseSearchBar';
import RGRecipe from '../../components/RGRecipe';
import StringConfig from '../../StringConfig';
import { fetchIngredientData, fetchRecipeData } from '../../util';
import './KitchenSearch.css';

function KitchenSearch(): React.Node {
  const [kitchenInfo, setKitchen] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [displayIngDropdown, setDisplayIngDropdown] = useState(false);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetchIngredientData(setIngredients);

    const apiCallback = (apiData) => {
      const mutatedData = apiData.map((rec, ind) => {
        const newRec = { ...rec, index: ind };
        return newRec;
      });
      setRecipeData(mutatedData);
    };

    fetchRecipeData(apiCallback);
  }, []);

  const onBlur = (ev) => {
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      setDisplayIngDropdown(false);
    }
  };

  const addKitchenItem = (item) => {
    if (!kitchenInfo.includes(item)) setKitchen([...kitchenInfo, item]);
  };

  const onSearchAction = (text) => {
    setSearchValue(text);
  };

  const removeKitchenItem = (item) => {
    const newKitchen = kitchenInfo.filter((ki) => ki !== item);
    setKitchen(newKitchen);
  };

  const filteredIngredients = ingredients.filter((ing) => searchValue && searchValue !== ''
    && ing.name.toLowerCase().includes(searchValue.toLowerCase()));

  const userIngredients = filteredIngredients.map((ing, ind) => (
    <button
      key={ind}
      onBlur={onBlur}
      onClick={() => addKitchenItem(ing.name)}
      type="button"
    >
      {ing.name}
    </button>
  ));

  const kitchenItems = kitchenInfo.map((ki, ind) => (
    <div className="kitchen-item">
      <span key={ind}>{ki}</span>
      <div className="buttons">
        <button
          className="minus"
          onClick={() => removeKitchenItem(ki)}
          type="button"
        >
          <span className="material-icons-outlined">
            do_not_disturb_on
          </span>
        </button>
      </div>
    </div>
  ));

  const generatedRecipes = (
    recipeData.length > 0 ? recipeData.map((item, ind) => (
      <RGRecipe
        key={ind}
        author="Chadwick Boseman"
        authorID="1"
        imageUrl={item.cover}
        recipeUrl={`/recipe/${item._id}`}
        title={item.name}
        kitchenStringified={JSON.stringify(kitchenInfo)}
      />
    )) : StringConfig.API_FAILURE_WARNING
  );

  const onFocus = () => {
    setDisplayIngDropdown(true);
  };

  const dropdownClassName = displayIngDropdown && filteredIngredients.length > 0 ? 'ingredients-display' : 'ingredients-display hidden';

  return (
    <>
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_DEFAULT}
        title="Your Kitchen"
      />
      <section className="rga-section rg-kitchen">
        <div className="rg-container">
          <header>
            <h1><strong>Your Kitchen</strong></h1>
          </header>
          <div
            className="kitchen-search"
            onBlur={onBlur}
          >
            <RGBaseSearchBar
              onAction={onSearchAction}
              onFocus={onFocus}
              placeholder="Search for ingredients"
            />
            <div className={dropdownClassName} onBlur={(e) => e.stopPropagation()}>
              {userIngredients}
            </div>
          </div>
          <h6 className="ms-title">Your Available Ingredients</h6>
          {kitchenInfo.length > 0 ? (
            <div className="user-kitchen">
              {kitchenItems}
            </div>
          ) : null}
          <h6 className="ms-title">Recipes</h6>
          <div className="recommended-recipes">
            {generatedRecipes}
          </div>
        </div>
      </section>
    </>
  );
}

export default KitchenSearch;
