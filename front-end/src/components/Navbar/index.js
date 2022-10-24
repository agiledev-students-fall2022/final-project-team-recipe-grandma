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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-ingredient" element={<SearchIngredients />} />
      </Routes>
      <Routes>
        <Route path="/:recipeindex" element={<RecipeInDetail />} />
      </Routes>
    </>
  );
}

export default Navbar;
