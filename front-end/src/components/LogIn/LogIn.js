import * as React from 'react';
import RGButton from '../RGButton';

function LogIn(): React.Node {
  return (
    <div className="LogInForm">
      <h1 className="username">Username</h1>
      <input type="text" />
      <h1 className="password">Password</h1>
      <input type="text" />
      <RGButton
        text="Submit"
        onAction={() => false}
        width="auto"
      />
    </div>
  );
}

export default LogIn;
