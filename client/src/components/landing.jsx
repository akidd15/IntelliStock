import React, { useState } from 'react';
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react';

export default function Landing() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User: ' + username);
    console.log('Password: ' + password);
    // Login logic here
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const handleCancelSignUp = () => {
    setShowSignUpForm(false);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Username: ' + username);
    console.log('Email: ' + email);
    console.log('Password: ' + password);
    // sign-up logic here
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
        {showSignUpForm ? (
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
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />

              <Form.Input
                fluid
                icon={null}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />

              <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Sign Up
              </Button>
              <Button fluid size="large" onClick={handleCancelSignUp} style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Cancel
              </Button>
            </Segment>
          </Form>
        ) : (
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon={null}
                placeholder="Email"
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
                required
                style={{ fontSize: '1.2em', marginBottom: '1em' }}
              />

              <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
                Login
              </Button>
            </Segment>
          </Form>
        )}
        <p style={{ marginTop: '1em', color: 'white' }}>
          <span style={{ color: 'white' }}>Don't have an account? </span>
          <span onClick={handleSignUpClick} style={{ cursor: 'pointer', color: '#3498db' }}>Sign up here</span>.
        </p>
      </Grid.Column>
    </Grid>
  );
}
