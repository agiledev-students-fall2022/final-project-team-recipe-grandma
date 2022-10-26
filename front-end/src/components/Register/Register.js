import * as React from 'react';
import { useState } from 'react';
import RGButton from '../RGButton';
import './Register.css';

function Register(): React.Node {
  const [usernameText, setUsernameText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');
  const [confirmedPasswordText, setConfirmedPasswordText] = useState('');

  console.log(usernameText, passwordText, confirmedPasswordText);

  return (
    <div className="LogInFormContainer">
      <form className="LogInForm">
        <h2 className="username">Username</h2>
        <div className="usernameInput">
          <input
            type="text"
            placeholder="Enter username"
            onChange={(ev) => setUsernameText(ev.target.value)}
          />
        </div>
        <h2 className="password">Password</h2>
        <div className="passwordInput">
          <input
            type="password"
            placeholder="Enter password"
            onChange={(ev) => setPasswordText(ev.target.value)}
          />
        </div>
        <h2 className="confirmedPassword">Password</h2>
        <div className="confirmedPasswordInput">
          <input
            type="password"
            placeholder="Enter password again"
            onChange={(ev) => setConfirmedPasswordText(ev.target.value)}
          />
        </div>
        <RGButton
          text="Submit"
          onAction={() => false}
          width="auto"
        />
      </form>
    </div>
  );
}

export default Register;
