import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

type Props = {|
  RequireAuthOrLogout: boolean
|};

const defaultProps = {
  requireAuthOrLogout: true,
};

function ProtectedRoutes(props: Props): React.Node {
  const { requireAuthOrLogout } = props;
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
  }, []);

  // console.log('Auth', auth);
  const requireAuth = auth?.token ? <Outlet /> : <Navigate to="/login" />;
  const requireLogout = !auth?.token ? <Outlet /> : <Navigate to="/" />;
  return requireAuthOrLogout ? requireAuth : requireLogout;
}

ProtectedRoutes.defaultProps = defaultProps;

export default ProtectedRoutes;
