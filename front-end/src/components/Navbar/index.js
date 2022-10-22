import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Home from '../../pages/Home';
import SearchIngredients from '../../pages/SearchIngredients';
import RecipeInDetail from '../../pages/RecipeInDetail';

function Navbar(): React.Node {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search-ingredient">Search</Link></li>
          <li><Link to="/a-recipe-in-detail">A Recipe in Detail</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-ingredient" element={<SearchIngredients />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a-recipe-in-detail" element={<RecipeInDetail />} />
      </Routes>
    </>
  );
}

export default Navbar;
