import * as React from 'react';

type Props = $ReadOnly<{|
  onAction: (ingredient: string) => void
|}>;

function SearchBar(prop: Props): React.Node {
  const { onAction } = prop;

  return (
    <div className="SearchBar">
      <h1>Add your ingredients</h1>
      <input type="text" name="search" />
      <button type="button" className="search-button" onClick={onAction}>add</button>
    </div>
  );
}

export default SearchBar;
