import * as React from 'react';
import { useState } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import Home from '../../pages/Home';
import RecipeInDetail from '../../pages/RecipeInDetail';
import ReviewPage from '../../pages/ReviewPage/ReviewPage';
import SearchIngredients from '../../pages/SearchIngredients';
import UserUpload from '../../pages/UserUpload';
import LogInPage from '../../pages/LogInPage/LogInPage';
import NavbarListItem from '../NavbarListItem';

import './Navbar.css';
import Register from '../Register/Register';
import ProtectedRoutes from '../ProtectedRoutes';

type RouteDefinition = $ReadOnly<{|
  routePath: string,
  title: string,
  icon: string
|}>;

type Props = $ReadOnly<{|
  AppRoutes: Array<RouteDefinition>
|}>;

function Navbar(props: Props): React.Node {
  const [currentSelection, setSelection] = useState('home');

  const { AppRoutes } = props;

  const NavItems = AppRoutes.map((appRoute, ind) => {
    if (ind > 5) {
      console.warn('Max nav-item limit reached.');
      return null;
    }

    return (
      <NavbarListItem
        key={ind}
        routePath={appRoute.routePath}
        text={appRoute.title}
        icon={appRoute.icon}
        currentSelection={currentSelection}
        onAction={setSelection}
      />
    );
  });

  return (
    <>
      <nav className="rg-navbar">
        <ul className="rg-primary-nav rg-flex">
          {NavItems}
          {/* <div className="rg-nav-indicator" /> */}
        </ul>
      </nav>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/recipe/:recipeindex" element={<RecipeInDetail />} />
          <Route path="/recipe/:recipeindex/review/" element={<ReviewPage />} />
          <Route path="/search-ingredient" element={<SearchIngredients />} />
          <Route path="/profile" element={<UserUpload />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default Navbar;
