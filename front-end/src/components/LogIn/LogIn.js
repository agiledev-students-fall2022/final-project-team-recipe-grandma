import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../util';
import RGInput from '../UtilityComponents/RGInput';
// import RGButton from '../RGButton';
import './LogIn.css';

function LogIn(): React.Node {
  const [emailText, setEmailText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');

  console.log(emailText, passwordText);

  const handleLogin = () => {
    LoginUser({
      username: emailText,
      password: passwordText,
      callback: (data) => console.log('User data', data),
    });
  };

  return (
    <div className="rg-auth-form">
      <div className="rg-auth-form-header">
        <img src="/alegria/Surfer.png" alt="" className="rg-auth-banner" />
        <h1 className="rg-auth-form-title my-4"><strong>Sign In</strong></h1>
      </div>
      <div className="rg-auth-form-inputs mb-5">
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setEmailText(ev.target.value)}
            type="text"
            label="Enter your e-mail"
          />
        </div>
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setPasswordText(ev.target.value)}
            type="password"
            label="Password"
          />
        </div>
        <button
          className="rg-auth-btn mt-2"
          onClick={handleLogin}
          type="button"
        >
          Sign In
        </button>
        <p className="rg-auth-subtext mt-3 mb-5">
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
