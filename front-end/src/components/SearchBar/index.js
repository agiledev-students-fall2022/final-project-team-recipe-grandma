import * as React from 'react';
import { useState } from 'react';

function SearchBar(): React.Node {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    // value of input field
    console.log('handleClick: ', search);
  };

  return (
    <div className="SearchBar">
      <h1>Add your ingredients</h1>
      <input type="text" name="search" onChange={handleChange} value={search} />
      <button type="button" className="search-button" onClick={handleClick}>add</button>
    </div>
  );
}

export default SearchBar;
