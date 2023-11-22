import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

export const SignUpForm = ({
  username,
  email,
  password,
  confirmPassword,
  passwordMismatch,
  emailError,
  passwordError,
  handleUsername,
  handleEmail,
  handlePassword,
  handleConfirmPassword,
  handleSignUpSubmit,
  handleCancelSignUp,
}) => (
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
);
