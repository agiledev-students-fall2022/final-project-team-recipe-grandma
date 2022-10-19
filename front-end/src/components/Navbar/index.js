import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Home from '../Home';

function Navbar(): React.Node {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default Navbar;
