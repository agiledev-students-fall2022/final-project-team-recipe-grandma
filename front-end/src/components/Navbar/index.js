import * as React from 'react';
import {
  Route, Routes, Link,
} from 'react-router-dom';
import Home from '../../pages/Home';
import RecipeInDetail from '../../pages/RecipeInDetail';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import SearchIngredients from '../../pages/SearchIngredients';
import './Navbar.css';

function Navbar(): React.Node {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="navbar-brand mx-auto" to="/"><img src="http://placekitten.com/40/40" alt="" className="logo" /></Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/search-ingredient">Search</Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* <nav className="">
        <div className="navbar-container">
          <div className="logo-container">
            <Link className="nav-link" to="/"><img className="logo" src="http://placekitten.com/40/40" alt="Placeholder img of kitten" /></Link>
          </div>
        </div>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeindex" element={<RecipeInDetail />} />
        <Route path="/review/:recipeindex" element={<ReviewPage />} />
        <Route path="/search-ingredient" element={<SearchIngredients />} />
      </Routes>
    </>
  );
}

export default Navbar;
