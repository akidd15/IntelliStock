import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      window.location.replace('/home');
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Segment inverted style={{ backgroundColor: 'white', width: '100%' }}>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/home">back to the homepage.</Link>
        </p>
      ) : (
        <Form size="large" onSubmit={handleLoginSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon={null}
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            />

            <Form.Input
              fluid
              icon={null}
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            />

            <Button
              color="green"
              fluid
              size="large"
              type="submit"
              style={{ fontSize: '1.2em', marginBottom: '1em' }}
            >
              Login
            </Button>
          </Segment>
        </Form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </Segment>
  );
};

