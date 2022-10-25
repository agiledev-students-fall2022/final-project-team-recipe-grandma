import { useState } from 'react';
import * as React from 'react';

type Props = $ReadOnly<{|
  onAction: (ingredient: string) => void
|}>;

function SearchBar(prop: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');
  const { onAction } = prop;
  // [TODO: Add dropdown :)]
  const searchBarEventHandler = (ev) => {
    setSearchBarValue(ev.target.value);
  };

  const handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      onAction(searchBarValue);
    }
  };

  return (
    <div className="SearchBar">
      <h1>Add your ingredients</h1>
      <p>{searchBarValue}</p>
      <input type="text" value={searchBarValue} name="search" onChange={searchBarEventHandler} onKeyPress={handleKeyPress} />
      <button type="button" className="search-button" onClick={() => onAction(searchBarValue)}>add</button>
    </div>
  );
}

export default SearchBar;
