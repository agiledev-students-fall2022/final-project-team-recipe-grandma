import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register(): React.Node {
  const [usernameText, setUsernameText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');
  const [confirmedPasswordText, setConfirmedPasswordText] = useState('');

  console.log(usernameText, passwordText, confirmedPasswordText);

  const handleRegistation = () => {
    if (confirmedPasswordText !== passwordText) return null;
  };

  return (
    <div className="rg-auth-form">
      <img src="/alegria/PineappleAndPainter.jpg" alt="" className="rg-auth-banner" />
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
        <input
          className="rg-auth-input"
          onChange={(ev) => setConfirmedPasswordText(ev.target.value)}
          placeholder="Confirm your password"
          type="password"
        />
        <button
          className="rg-auth-btn mt-2"
          onClick={handleRegistation}
          type="button"
        >
          Submit
        </button>
        <p className="rg-auth-subtext mt-3">
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
