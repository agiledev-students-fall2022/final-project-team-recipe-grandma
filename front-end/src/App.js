import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './features/auth/authSlice';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from './components/Navbar';
import './App.css';

function App(): React.Node {
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionInfo = localStorage.getItem('userSession');
    if (sessionInfo) {
      const sessionData = JSON.parse(sessionInfo);
      dispatch(signIn({
        _id: sessionData._id,
        name: sessionData.name,
        email: sessionData.email,
        token: sessionData.token,
      }));
    }
  }, []);
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
