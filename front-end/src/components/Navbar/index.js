import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import Home from '../../pages/Home';
import RecipeInDetail from '../../pages/RecipeInDetail';
import LogInPage from '../../pages/LogInPage/LogInPage';
import NavbarListItem from '../NavbarListItem';
import Register from '../../pages/Register/Register';
import ProtectedRoutes from '../ProtectedRoutes';
import UserUpload from '../../pages/UserUpload';

import './Navbar.css';
import Profile from '../../pages/Profile';
import KitchenSearch from '../../pages/KitchenSearch';

type RouteDefinition = $ReadOnly<{|
  routePath: string,
  title: string,
  icon: string
|}>;

type Props = $ReadOnly<{|
  AppRoutes: Array<RouteDefinition>
|}>;

function Navbar(props: Props): React.Node {
  const [currentSelection, setSelection] = useState('Home');
  const { AppRoutes } = props;
  const location = useLocation();

  useEffect(() => {
    console.log(window.location.href, window.location.pathname === '/');
    const { pathname } = location;
    setSelection('');

    AppRoutes.every((route) => {
      if (pathname === '/') {
        setSelection('Home');
        return false;
      }
      if (
        pathname.indexOf(route.routePath) > -1
        && route.routePath !== '/'
      ) {
        setSelection(route.title);
        return false;
      }
      return true;
    });
  }, [location]);

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
          <Route path="/search-ingredient" element={<KitchenSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-recipe" element={<UserUpload />} />
        </Route>
        <Route element={<ProtectedRoutes requireAuthOrLogout={false} />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default Navbar;
