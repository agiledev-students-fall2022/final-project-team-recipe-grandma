import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import * as Util from '../../util';

import './SearchBar.css';

type Props = $ReadOnly<{|
  onAction: (ingredient: string) => void
|}>;

function SearchBar(prop: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [data, setData] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [filteredValues, setFilteredValues] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchOptionsRef = useRef(null);

  const { onAction } = prop;

  // [TODO: Add dropdown :)]
  useEffect(() => {
    if (!searchOptionsRef.current) return;
    searchOptionsRef.current.scrollIntoView({
      block: 'center',
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (filteredValues.length > 0 && !searchFocused) setSearchFocused(true);
    if (filteredValues.length <= 0) setSearchFocused(false);
  }, [filteredValues]);

  const handleKeyDown = (ev) => {
    const { key } = ev;
    let nextIndexCount = 0;
    switch (key) {
      case 'ArrowDown':
        nextIndexCount = (focusedIndex + 1) % filteredValues.length;
        setSearchBarValue(filteredValues[nextIndexCount].name);

        break;
      case 'ArrowUp':
        nextIndexCount = (focusedIndex - 1) % filteredValues.length;
        setSearchBarValue(filteredValues[nextIndexCount].name);
        break;
      case 'Enter':
        setSearchBarValue(filteredValues[focusedIndex].name);
        onAction(filteredValues[focusedIndex].name);
        break;
      case 'Escape':
        setSearchFocused(false);
        break;
      default:
        break;
    }
    setFocusedIndex(nextIndexCount);
  };

  const handleChange = (ev) => {
    const { target } = ev;
    setSearchBarValue(ev.target.value);
    setSearchFocused(true);
    if (!target.value.trim()) return setFilteredValues([]);

    const newFilteredValues = data.filter((ing) => (
      ing.name.toLowerCase().startsWith(target.value)
    ));
    setFilteredValues(newFilteredValues);
  };

  const setupOptions = (info) => {
    setData(info);
    setFilteredValues(info);
  };

  useEffect(() => {
    Util.fetchIngredientData(setupOptions);
  }, []);

  // const onOptionClicked = () => {

  // }

  return (
    <div className="SearchBar">
      <h1>Add your ingredients</h1>
      <p>{searchBarValue}</p>
      <div
        className="search-container"
      >
        <input
          className="sc-search"
          type="text"
          placeholder="Search for ingredients here..."
          value={searchBarValue}
          name="search"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {searchFocused ? (
          <div className="search-options-container">
            <div className="search-options">
              {filteredValues.length > 0 ? filteredValues.map((ing, i) => (
                <div
                  className={i === focusedIndex ? 'sb-ing-option sb-ing-option__focused' : 'sb-ing-option'}
                  aria-label="ingredient"
                  role="button"
                  tabIndex={i}
                  key={i}
                  ref={i === focusedIndex ? searchOptionsRef : null}
                  value={ing.name}
                  onKeyDown={handleKeyDown}
                  onClick={() => onAction(ing.name)}
                >
                  {ing.name}
                </div>
              )) : null}
            </div>
          </div>
        ) : null}
      </div>
      {/* <button
        type="button"
        className="search-button"
        onClick={() => onAction(searchBarValue)}
      >
        add
      </button> */}
    </div>
  );
}

export default SearchBar;
