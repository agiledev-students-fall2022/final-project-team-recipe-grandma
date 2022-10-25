import { useState } from 'react';
import * as React from 'react';

type Props = $ReadOnly<{|
  onAction: (ingredient: string) => void
|}>;

function SearchBar(prop: Props): React.Node {
  const [searchBarValue, setSearchBarValue] = useState('');
  const { onAction } = prop;

  const searchBarEventHandler = (ev) => {
    setSearchBarValue(ev.target.value);
  };

  return (
    <div className="SearchBar">
      <h1>Add your ingredients</h1>
      <p>{searchBarValue}</p>
      <input type="text" value={searchBarValue} name="search" onChange={searchBarEventHandler} />
      <button type="button" className="search-button" onClick={() => onAction(searchBarValue)}>add</button>
    </div>
  );
}

export default SearchBar;
