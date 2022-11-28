/* eslint-disable react/prop-types */
import * as React from 'react';
import { createContext, useMemo, useState } from 'react';

const AuthContext = createContext({});

type Props = $ReadOnly<{|
  children: React.Node
|}>;

export function AuthProvider({ children }: Props): React.Node {
  const [auth, setAuth] = useState({});

  const kids = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  console.log('New auth', auth);

  return (
    <AuthContext.Provider value={kids}>
      {children}
    </AuthContext.Provider>
  );
}
/* eslint-enable react/prop-types */

export default AuthContext;
