import * as React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

function Register(): React.Node {
  return (
    <AuthForm authFormType="register" />
  );
}

export default Register;
