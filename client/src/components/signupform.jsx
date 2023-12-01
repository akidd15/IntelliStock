import { useState } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export const SignUpForm = ({
  passwordMismatch,
  emailError,
  passwordError,
  handleCancelSignUp,
}) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);

      window.location.replace('/home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon={null}
              placeholder="Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            />

            <Form.Input
              fluid
              icon={null}
              placeholder="Email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              error={emailError !== ''}
              required
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            />
            {emailError && (
              <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>{emailError}</p>
            )}

            <Form.Input
              fluid
              icon={null}
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              error={passwordError !== ''}
              required
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            />
            {passwordError && (
              <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '0.5em' }}>{passwordError}</p>
            )}

            <Button
              color="green"
              fluid
              size="large"
              type="submit"
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            >
              Sign Up
            </Button>
            <Button
              fluid
              size="large"
              onClick={handleCancelSignUp}
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            >
              Cancel
            </Button>
          </Segment>
        </Form>
        {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
      
    </div>
  )
};
