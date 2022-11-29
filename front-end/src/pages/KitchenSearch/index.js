import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGBaseSearchBar from '../../components/RGBaseSearchBar';
import RGRecipe from '../../components/RGRecipe';
import StringConfig from '../../StringConfig';
import {
  fetchIngredientData,
  fetchRecipeData,
  searchRecipesByIngredient,
  searchForIngredient,
} from '../../util';
import './KitchenSearch.css';
import RGButton from '../../components/RGButton';
import { selectUser } from '../../features/auth/authSlice';

function KitchenSearch(): React.Node {
  const [kitchenInfo, setKitchen] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [displayIngDropdown, setDisplayIngDropdown] = useState(false);
  const [recipeData, setRecipeData] = useState([]);

  const abortControllerRef = useRef(new AbortController());

  const user = useSelector(selectUser);

  useEffect(() => {
    const controller = abortControllerRef.current;
    fetchIngredientData(setIngredients, controller);
    fetchRecipeData(setRecipeData);

    return () => {
      controller.abort();
    };
  }, []);

  console.log(ingredients);

  const onBlur = (ev) => {
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      setDisplayIngDropdown(false);
    }
  };

  const onChange = (text) => {
    setSearchValue(text);
    const apiCallback = (apiData) => {
      console.log(apiData);
      setIngredients(apiData);
    };

    searchForIngredient(apiCallback, text, `Bearer ${user.token}`);
  };

  const addKitchenItem = (item) => {
    if (!kitchenInfo.includes(item)) setKitchen([...kitchenInfo, item]);
  };

  const removeKitchenItem = (item) => {
    const newKitchen = kitchenInfo.filter((ki) => ki !== item);
    setKitchen(newKitchen);
  };

  const userIngredients = ingredients.map((ing) => (
    <button
      key={ing.id}
      onBlur={onBlur}
      onClick={() => addKitchenItem(ing)}
      type="button"
    >
      {ing.name}
    </button>
  ));

  const searchForRecipes = () => {
    const apiCallback = (apiData) => {
      console.log(apiData);
      setRecipeData(apiData);
    };

    searchRecipesByIngredient(apiCallback, kitchenInfo, null, `Bearer ${user.token}`);
  };

  const kitchenItems = kitchenInfo.map((ki, ind) => (
    <div className="kitchen-item">
      <span key={ind}>{ki.name}</span>
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
    recipeData.length > 0 ? recipeData.map((item) => (
      <RGRecipe
        key={item._id}
        author={item.author}
        authorID={item.userId}
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

  const dropdownClassName = displayIngDropdown && ingredients.length > 0 ? 'ingredients-display' : 'ingredients-display hidden';

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
              onFocus={onFocus}
              onChange={onChange}
              placeholder="Search for ingredients"
              value={searchValue}
            />
            <div className={dropdownClassName} onBlur={(e) => e.stopPropagation()}>
              {userIngredients}
            </div>
          </div>
          <h6 className="ms-title">
            <span className="me-3">Your Available Ingredients</span>
            <RGButton
              onAction={searchForRecipes}
              text="Search Recipes"
              width="auto"
              isBoxed
              isFlat
            />
          </h6>
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
