import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//  Permitted to use Redux for AUTH ONLY
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/authSlice';
//  Permitted to use Redux for AUTH ONLY
import useAuth from '../../hooks/useAuth';
import { RegisterUser, LoginUser } from '../../util';
import RGInput from '../UtilityComponents/RGInput';
import './AuthForm.css';

type Props = $ReadOnly<{|
  authFormType: string
|}>;

const AUTH_ERROR_ENUMS = Object.freeze({
  PASSWORD_IS_INCORRECT: 'password_is_incorrect',
  USER_NOT_FOUND: 'user_not_found',
  USER_ALREADY_EXISTS: 'user_exists',
  INVALID_FIELDS: 'invalid_fields',
  USER_CREATION_FAILED: 'failed_to_create_user',
  PASSWORDS_DO_NOT_MATCH: 'passwords_do_not_match',
});

// Should have a Loader to show the API is being called for Login/Register

function LogIn(): React.Node {
  const [errorMsgVisible, setEMVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailText, setEmailText] = useState('');
  // For a more secure approach, you could hash here & on the backend
  const [passwordText, setPasswordText] = useState('');

  const dispatch = useDispatch();
  const errorMsgToEnum = errorMsg.toLowerCase().replaceAll(' ', '_');
  const passwordError = AUTH_ERROR_ENUMS.PASSWORD_IS_INCORRECT === errorMsgToEnum;
  const emailError = AUTH_ERROR_ENUMS.USER_NOT_FOUND === errorMsgToEnum;

  const { setAuth } = useAuth();

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
      setAuth({
        _id: data._id,
        name: data.name,
        email: data.email,
        token: data.token,
      });

      dispatch(signIn({
        _id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      }));
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
            error={emailError}
            onChange={(ev) => setEmailText(ev.target.value)}
            type="text"
            label="Enter your e-mail"
            value={emailText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            error={passwordError}
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
          <span className="rg-a-underline" />
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
  const dispatch = useDispatch();

  const { setAuth } = useAuth();

  const errorMsgToEnum = errorMsg.toLowerCase().replaceAll(' ', '_');
  const passwordError = AUTH_ERROR_ENUMS.PASSWORDS_DO_NOT_MATCH === errorMsgToEnum;
  const emailError = AUTH_ERROR_ENUMS.USER_ALREADY_EXISTS === errorMsgToEnum;
  const invalidFieldsOrFailureError = (AUTH_ERROR_ENUMS.INVALID_FIELDS === errorMsgToEnum
    || AUTH_ERROR_ENUMS.USER_CREATION_FAILED === errorMsgToEnum
  );

  const OnAuthCallback = (data) => {
    if (data.message) {
      setErrorMsg(data.message);
      setEMVisible(true);
      setTimeout(() => {
        setEMVisible(false);
      }, 2000);
    } else {
      setErrorMsg('');

      setAuth({
        _id: data._id,
        name: data.name,
        email: data.email,
        token: data.token,
      });

      // We want to use the user data and store the token in session
      dispatch(signIn({
        _id: data.id,
        name: data.name,
        email: data.email,
        token: data.token,
      }));
    }
  };

  const handleRegistation = () => {
    if (confirmedPasswordText !== passwordText) {
      setErrorMsg(AUTH_ERROR_ENUMS.PASSWORDS_DO_NOT_MATCH);
    }
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
            error={invalidFieldsOrFailureError}
            onChange={(ev) => setUsernameText(ev.target.value)}
            type="text"
            label="Username"
            value={usernameText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            error={emailError || invalidFieldsOrFailureError}
            onChange={(ev) => setEmailText(ev.target.value)}
            type="text"
            label="Enter your e-mail"
            value={emailText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            error={passwordError || invalidFieldsOrFailureError}
            onChange={(ev) => setPasswordText(ev.target.value)}
            type="password"
            label="Password"
            value={passwordText}
          />
        </div>
        <div className="mb-2">
          <RGInput
            error={passwordError || invalidFieldsOrFailureError}
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
          <span className="rg-a-underline" />
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
