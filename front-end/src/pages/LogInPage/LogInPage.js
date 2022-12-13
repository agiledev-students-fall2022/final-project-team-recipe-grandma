import * as React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

function LogInPage(): React.Node {
  return (
    <AuthForm authFormType="login" />
  );
}

export default LogInPage;
