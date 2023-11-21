import React, { useState } from 'react';
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react';

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
      // Continue with login logic
      console.log('Username: ' + username);
      console.log('Password: ' + password);
      // Additional login logic here
    } else {
      // Display an error message or handle invalid form submission
      console.log('Login form is not valid. Please check the fields.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (isSignUpFormValid()) {
      // Continue with sign-up logic
      console.log('Username: ' + username);
      console.log('Email: ' + email);
      console.log('Password: ' + password);
      // Additional sign-up logic here
    } else {
      // Display an error message or handle invalid form submission
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
          <Form size="large" onSubmit={handleLoginSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon={null}
                placeholder="Username"
                value={username}
                onChange={handleUsername}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />

              <Form.Input
                fluid
                icon={null}
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePassword}
                error={passwordError !== ''}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />
              {passwordError && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>{passwordError}</p>
              )}

              <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Login
              </Button>
            </Segment>
          </Form>
        ) : (
          <Form size="large" onSubmit={handleSignUpSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon={null}
                placeholder="Username"
                value={username}
                onChange={handleUsername}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />

              <Form.Input
                fluid
                icon={null}
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                error={emailError !== ''}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />
              {emailError && <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>{emailError}</p>}

              <Form.Input
                fluid
                icon={null}
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePassword}
                error={passwordError !== ''}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />
              {passwordError && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>{passwordError}</p>
              )}

              {passwordFinished && (
                <Form.Input
                  fluid
                  icon={null}
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  error={passwordMismatch}
                  required
                  style={{ fontSize: '1.2em', marginBottom: '1em', borderColor: passwordMismatch ? 'red' : '' }}
                />
              )}
              {passwordMismatch && (
                <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>Passwords do not match.</p>
              )}

              <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Sign Up
              </Button>
              <Button fluid size="large" onClick={handleCancelSignUp} style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Cancel
              </Button>
            </Segment>
          </Form>
        )}
        {!showSignUpForm && (
          <p style={{ marginTop: '1em', color: 'white' }}>
            <span style={{ color: 'white' }}>Don't have an account? </span>
            <span onClick={handleSignUpClick} style={{ cursor: 'pointer', color: '#3498db' }}>
                Sign up here
            </span>
            .
          </p>
        )}
      </Grid.Column>
    </Grid>
  );
}


