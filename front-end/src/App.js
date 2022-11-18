import * as React from 'react';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from './components/Navbar';
import './App.css';

function App(): React.Node {
  const AppRoutes = [
    {
      routePath: '/',
      title: 'Home',
      icon: 'home',
    },
    {
      routePath: '/search-ingredient',
      title: 'Search',
      icon: 'search',
    },
    {
      routePath: '/create-recipe',
      title: 'Add Recipe',
      icon: 'add',
    },
    {
      routePath: '/profile',
      title: 'Profile',
      icon: 'person',
    },
    {
      routePath: '/',
      title: 'Recipe',
      icon: 'feed',
    },
  ];

  return (
    <Navbar
      AppRoutes={AppRoutes}
    />
  );
}

export default App;
