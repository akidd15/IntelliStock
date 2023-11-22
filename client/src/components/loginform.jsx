import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

export const LoginForm = ({ username, password, handleUsername, handlePassword, handleLoginSubmit }) => (
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
        required
        style={{ fontSize: '1.2em', marginBottom: '1em' }}
      />

      <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
        Login
      </Button>
    </Segment>
  </Form>
);