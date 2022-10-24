import * as React from 'react';
import {
  Route, Routes, Link, useNavigate,
} from 'react-router-dom';

import Home from '../../pages/Home';
import SearchIngredients from '../../pages/SearchIngredients';
import RecipeInDetail from '../../pages/RecipeInDetail';
import CustomButton from '../Button';
import './Navbar.css';

function Navbar(): React.Node {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <nav>
        <div className="navbar-container">
          <div className="logo-container">
            <a href="/" className="logo-link"><img className="logo" src="http://placekitten.com/40/40" alt="Placeholder img of kitten" /></a>
          </div>
          <div className="back-btn-container">
            <CustomButton className="back-btn" text="Back" onAction={goBack} />
          </div>
        </div>
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
      <Routes>
        <Route path="/a-recipe-in-detail/:recipe" element={<RecipeInDetail />} />
      </Routes>
    </>
  );
}

export default Navbar;
