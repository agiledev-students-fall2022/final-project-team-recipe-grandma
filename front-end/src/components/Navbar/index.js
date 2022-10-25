import * as React from 'react';
import {
  Route, Routes, Link, useNavigate,
} from 'react-router-dom';

import CustomButton from '../CustomButton';
import Home from '../../pages/Home';
import RecipeInDetail from '../../pages/RecipeInDetail';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import SearchIngredients from '../../pages/SearchIngredients';
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
            <Link to="/"><img className="logo" src="http://placekitten.com/40/40" alt="Placeholder img of kitten" /></Link>
          </div>
          <div className="back-btn-container">
            <CustomButton className="back-btn" text="Back" onAction={goBack} />
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeindex" element={<RecipeInDetail />} />
        <Route path="/:recipeindex/review" element={<ReviewPage />} />
        <Route path="/search-ingredient" element={<SearchIngredients />} />
      </Routes>
    </>
  );
}

export default Navbar;
