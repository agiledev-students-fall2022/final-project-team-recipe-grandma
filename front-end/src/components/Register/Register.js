import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../util';
import RGInput from '../UtilityComponents/RGInput';
import './Register.css';

function Register(): React.Node {
  const [usernameText, setUsernameText] = useState('');
  const [emailText, setEmailText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');
  const [confirmedPasswordText, setConfirmedPasswordText] = useState('');

  console.log(usernameText, passwordText, confirmedPasswordText);

  const handleRegistation = () => {
    if (confirmedPasswordText !== passwordText) return null;
    RegisterUser({
      email: emailText,
      name: usernameText,
      password: passwordText,
      callaback: (data) => console.log('Registeration results', data),
    });
  };

  return (
    <div className="rg-auth-form">
      <div className="rg-auth-form-header">
        <img src="/alegria/PineappleAndPainter.jpg" alt="" className="rg-auth-banner" />
        <h1 className="rg-auth-form-title my-4"><strong>Create Your Account</strong></h1>
      </div>
      <div className="rg-auth-form-inputs mb-5">
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setUsernameText(ev.target.value)}
            type="text"
            label="Username"
          />
        </div>
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
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setConfirmedPasswordText(ev.target.value)}
            type="password"
            label="Confirm Password"
          />
        </div>
        <button
          className="rg-auth-btn mt-2"
          onClick={handleRegistation}
          type="button"
        >
          Sign Up
        </button>
        <p className="rg-auth-subtext mt-3 mb-5">
          Already have an account? Click&nbsp;
          <Link
            to="/login"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
