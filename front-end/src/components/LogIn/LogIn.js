import * as React from 'react';
import RGButton from '../RGButton';
import './LogIn.css';

function LogIn(): React.Node {
  return (
    <div className="LogInFormContainer">
      <form className="LogInForm">
        <h2 className="username">Username</h2>
        <div className="usernameInput">
          <input type="text" placeholder="Enter username" />
        </div>
        <h2 className="password">Password</h2>
        <div className="passwordInput">
          <input type="text" placeholder="Enter password" />
        </div>
        <div className="button">
          <RGButton
            text="Submit"
            onAction={() => false}
            width="auto"
          />
        </div>
      </form>
    </div>
  );
}

export default LogIn;
