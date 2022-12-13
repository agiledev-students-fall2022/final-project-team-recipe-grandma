import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

type Props = {|
  RequireAuthOrLogout: boolean
|};

const defaultProps = {
  requireAuthOrLogout: true,
};

function ProtectedRoutes(props: Props): React.Node {
  const { requireAuthOrLogout } = props;
  const token = useSelector(selectCurrentToken);

  const requireAuth = token ? <Outlet /> : <Navigate to="/login" />;
  const requireLogout = !token ? <Outlet /> : <Navigate to="/" />;
  return requireAuthOrLogout ? requireAuth : requireLogout;
}

ProtectedRoutes.defaultProps = defaultProps;

export default ProtectedRoutes;
