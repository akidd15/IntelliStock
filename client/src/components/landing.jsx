import React, { useState } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
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
      style={{ height: '90vh',
      backgroundColor: 'white', 
      color: 'white',
      margin: 0, 
      padding: 0, 
      overflow: 'hidden',
      marginBottom: '-4px' }}
      verticalAlign="middle"
      stackable
    >
      <Grid.Row style={{ height: '100%' }}>
        {/* Left half */}
        <Grid.Column width={8} style={{
          height: '100%',
          display: 'flex',
          paddingLeft: '25px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #1d2b38, #2c3e50)', // Adjust the color values
        }}>
          <p textAlign="center" style={{ color: 'white', fontSize: '15px', lineHeight: '2.15' }}>
            Welcome to IntelliStock – Your Intelligent Inventory Management Solution. Streamline your inventory tracking effortlessly, ensuring precision and control over your stock. Gain insights, make informed decisions, and elevate your inventory management experience with IntelliStock. Sign up now and embrace a smarter way to manage your stock!
          </p>
        </Grid.Column>


        {/* Right half */}
        <Grid.Column
          width={8}
          style={{
            backgroundColor: '#2c3e50', // Background color
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #1d2b38, #2c3e50)', // Adjust the color values
          }}
        >
          <Segment inverted style={{ width: '70%', padding: '20px', borderRadius: '5px' }}>
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
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

