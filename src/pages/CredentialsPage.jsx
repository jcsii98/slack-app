import CredentialsInput from '../components/CredentialsInput.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CredentialsPage(props) {
  const { setIsLoggedIn, isLoggedIn, email, setEmail } = props;
  const [credentialsLabel, setCredentialsLabel] = useState('Login');
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [submitFunction, setSubmitFunction] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const showSignup = () => {
    if (credentialsLabel === 'Login') {
      setCredentialsLabel('Signup');
      setConfirmPasswordShow(true);
      setSubmitFunction(true);
      console.log('signup');
    } else {
      setCredentialsLabel('Login');
      setConfirmPasswordShow(false);
      setSubmitFunction(false);
      console.log('login');
    }
  };

  async function loginUser() {
    try {
      const response = await axios.post(
        'http://206.189.91.54/api/v1/auth/sign_in',
        {
          email: username,
          password: password,
        }
      );
      console.log(response.data);
      // Check if the response indicates a successful login
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log('user is logged in', email);
        sessionStorage.setItem(
          'access-token',
          response.headers['access-token']
        );
        sessionStorage.setItem('client', response.headers['client']);
        sessionStorage.setItem('expiry', response.headers['expiry']);
        sessionStorage.setItem('uid', response.headers['uid']);
      } else {
        setError('Invalid username or password. Please try again.'); // Set the error state
      }
    } catch (error) {
      console.error(error);
      setError('An error has occured. Please try again.'); // Set the error state
    }
  }

  async function registerUser() {
    try {
      const response = await axios.post('http://206.189.91.54/api/v1/auth/', {
        email: username,
        password: password,
        password_confirmation: confirmPassword,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError('User already exists. Please try again.'); // Set the error state
    }
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (submitFunction === false) {
      loginUser();
    } else {
      registerUser();
    }
  };

  return (
    <div className="body-container">
      <div className="container">
        <div className="card-body">
          <h1 className="mb-4">{credentialsLabel}</h1>
          <form autoComplete="off" onSubmit={handleSubmitForm}>
            <div className="mb-3 main-form">
              <CredentialsInput
                name="username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3 main-form">
              <CredentialsInput
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {confirmPasswordShow && (
              <div className="mb-3 main-form">
                <CredentialsInput
                  name="confirm password"
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword} // Bind value to state variable
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
                />
              </div>
            )}
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-primary">
              {credentialsLabel}
            </button>
            <div className="mt-3">
              {confirmPasswordShow
                ? 'Already have an account?'
                : "Don't have an account?"}{' '}
              <button
                className="btn btn-link p-0 text-btn"
                type="button"
                onClick={showSignup}
              >
                {confirmPasswordShow ? 'Login here' : 'Sign up here'}
              </button>
              .
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CredentialsPage;
