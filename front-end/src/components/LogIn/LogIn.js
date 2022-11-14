import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../util';
// import RGButton from '../RGButton';
import './LogIn.css';

function LogIn(): React.Node {
  const [usernameText, setUsernameText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');

  console.log(usernameText, passwordText);

  const handleLogin = () => {
    LoginUser({
      username: usernameText,
      password: passwordText,
      callback: (data) => console.log('User data', data),
    });
  };

  return (
    <div className="rg-auth-form">
      <img src="/alegria/Surfer.png" alt="" className="rg-auth-banner" />
      <div className="rg-auth-form-inputs">
        <input
          className="rg-auth-input"
          onChange={(ev) => setUsernameText(ev.target.value)}
          placeholder="Enter username"
          type="text"
        />
        <input
          className="rg-auth-input"
          onChange={(ev) => setPasswordText(ev.target.value)}
          placeholder="Enter password"
          type="password"
        />
        <button
          className="rg-auth-btn mt-2"
          onClick={handleLogin}
          type="button"
        >
          Submit
        </button>
        <p className="rg-auth-subtext mt-3">
          Want to register? Go&nbsp;
          <Link
            to="/register"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
