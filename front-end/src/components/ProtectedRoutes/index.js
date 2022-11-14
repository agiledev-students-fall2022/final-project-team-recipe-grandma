import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

type Props = {|
  RequireAuthOrLogout: boolean
|};

const defaultProps = {
  requireAuthOrLogout: true,
};

function ProtectedRoutes(props: Props): React.Node {
  const { requireAuthOrLogout } = props;
  const auth = { token: false }; // Fix later

  const requireAuth = auth.token ? <Outlet /> : <Navigate to="/login" />;
  const requireLogout = !auth.token ? <Outlet /> : <Navigate to="/" />;
  return requireAuthOrLogout ? requireAuth : requireLogout;
}

ProtectedRoutes.defaultProps = defaultProps;

export default ProtectedRoutes;
