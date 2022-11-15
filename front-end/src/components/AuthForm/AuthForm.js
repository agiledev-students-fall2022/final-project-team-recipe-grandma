import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser, LoginUser } from '../../util';
import RGInput from '../UtilityComponents/RGInput';
import './AuthForm.css';

type Props = $ReadOnly<{|
  authFormType: string
|}>;

// Should have a Loader to show the API is being called for Login/Register

function LogIn(): React.Node {
  const [errorMsgVisible, setEMVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailText, setEmailText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');

  const OnAuthCallback = (data) => {
    if (data.message) {
      setErrorMsg(data.message);
      setEMVisible(true);
      setTimeout(() => {
        setEMVisible(false);
      }, 2000);
    } else {
      setErrorMsg('');
      // We want to use the user data and store the token in session
    }
  };

  const handleLogin = () => {
    LoginUser({
      username: emailText,
      password: passwordText,
      callback: (data) => OnAuthCallback(data),
    });
  };

  const errorNotifyComponent = !errorMsgVisible ? null : (
    <p className="rg-auth-error"><strong>{errorMsg}</strong></p>
  );

  return (
    <div className="rg-auth-form">
      <div className="rg-auth-form-header">
        <img src="/alegria/Surfer.png" alt="" className="rg-auth-banner" />
        <h1 className="rg-auth-form-title my-4"><strong>Sign In</strong></h1>
      </div>
      <div className="rg-auth-form-inputs mb-5">
        {errorNotifyComponent}
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setEmailText(ev.target.value)}
            type="text"
            label="Enter your e-mail"
            value={emailText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setPasswordText(ev.target.value)}
            type="password"
            label="Password"
            value={passwordText}
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

function Register(): React.Node {
  const [errorMsgVisible, setEMVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [usernameText, setUsernameText] = useState('');
  const [emailText, setEmailText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');
  const [confirmedPasswordText, setConfirmedPasswordText] = useState('');

  const OnAuthCallback = (data) => {
    if (data.message) {
      setErrorMsg(data.message);
      setEMVisible(true);
      setTimeout(() => {
        setEMVisible(false);
      }, 2000);
    } else {
      setErrorMsg('');
      // We want to use the user data and store the token in session
    }
  };

  const handleRegistation = () => {
    if (confirmedPasswordText !== passwordText) return null;
    console.log('Handling registration');
    RegisterUser({
      email: emailText,
      name: usernameText,
      password: passwordText,
      callback: OnAuthCallback,
    });
  };

  const errorNotifyComponent = !errorMsgVisible ? null : (
    <p className="rg-auth-error"><strong>{errorMsg}</strong></p>
  );

  return (
    <div className="rg-auth-form">
      <div className="rg-auth-form-header">
        <img src="/alegria/PineappleAndPainter.jpg" alt="" className="rg-auth-banner" />
        <h1 className="rg-auth-form-title my-4"><strong>Create Your Account</strong></h1>
      </div>
      <div className="rg-auth-form-inputs mb-5">
        {errorNotifyComponent}
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setUsernameText(ev.target.value)}
            type="text"
            label="Username"
            value={usernameText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setEmailText(ev.target.value)}
            type="text"
            label="Enter your e-mail"
            value={emailText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setPasswordText(ev.target.value)}
            type="password"
            label="Password"
            value={passwordText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            onChange={(ev) => setConfirmedPasswordText(ev.target.value)}
            type="password"
            label="Confirm Password"
            value={confirmedPasswordText}
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

function AuthForm(props: Props): React.Node {
  const {
    authFormType,
  } = props;
  let formComponent;
  switch (authFormType) {
    case 'login':
      formComponent = <LogIn />;
      break;
    case 'register':
      formComponent = <Register />;
      break;
    default:
      formComponent = null;
      break;
  }
  return (
    <div className="auth-form">
      {formComponent}
    </div>
  );
}

export default AuthForm;
