import React, { useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { LoginForm } from './loginform'; 
import { SignUpForm } from './signupform';


export default function Landing() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFinished, setPasswordFinished] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(enteredEmail) ? '' : 'Invalid email address');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordFinished(true);

    // Password matching validation
    const enteredPassword = e.target.value;
    setPasswordMismatch(confirmPassword !== '' && password !== enteredPassword);
    setPasswordError(
      enteredPassword.length >= 8
        ? ''
        : 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.'
    );
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    // Password matching validation
    const enteredPassword = e.target.value;
    setPasswordMismatch(password !== enteredPassword);
  };

  const isLoginFormValid = () => {
    // Check if all fields in the login form are valid
    return username !== '' && password !== '';
  };

  const isSignUpFormValid = () => {
    // Check if all fields in the sign-up form are valid
    return (
      emailError === '' &&
      passwordError === '' &&
      !passwordMismatch &&
      username !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== ''
    );
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (isLoginFormValid()) {
      console.log('Username: ' + username);
      console.log('Password: ' + password);
      
    } else {
      console.log('Login form is not valid. Please check the fields.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (isSignUpFormValid()) {
      console.log('Username: ' + username);
      console.log('Email: ' + email);
      console.log('Password: ' + password);
      // Add sign up logic
    } else {
      console.log('Sign-up form is not valid. Please check the fields.');
    }
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const handleCancelSignUp = () => {
    setShowSignUpForm(false);
    setPasswordMismatch(false);
  };

  

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh', backgroundColor: '#2c3e50', color: 'white', margin: 0, padding: 0 }}
      verticalAlign="middle"
      stackable
    >
      <Grid.Column style={{ maxWidth: '400px', minWidth: '300px', width: '70%', margin: 0 }}>
        <Header as="h1" textAlign="center" style={{ color: 'white' }}>
          IntelliStock
        </Header>
        {!showSignUpForm ? (
          <LoginForm
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
            handleLoginSubmit={handleLoginSubmit}
          />
        ) : (
          <SignUpForm
            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            passwordMismatch={passwordMismatch}
            emailError={emailError}
            passwordError={passwordError}
            handleUsername={handleUsername}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            handleConfirmPassword={handleConfirmPassword}
            handleSignUpSubmit={handleSignUpSubmit}
            handleCancelSignUp={handleCancelSignUp}
            passwordFinished={passwordFinished}
          />
        )}
        {!showSignUpForm && (
          <p style={{ marginTop: '1em', color: 'white' }}>
            <span style={{ color: 'white' }}>Don't have an account? </span>
            <span onClick={handleSignUpClick} style={{ cursor: 'pointer', color: '#3498db' }}>
                Sign up here
            </span>
          </p>
        )}
      </Grid.Column>
    </Grid>
  );
}


