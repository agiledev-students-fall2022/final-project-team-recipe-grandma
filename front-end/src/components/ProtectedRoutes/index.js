import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes(): React.Node {
  const auth = { token: false }; // Fix later
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
