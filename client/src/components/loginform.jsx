
import { useState } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


import Auth from '../utils/auth';

 export const LoginForm = (props) => {
  // removed username: ''
  const [formState, setFormState] = useState({ email: '' , password: '' });
  // commented out
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
      
    });
  };

  // submit form
  const handleLoginSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: {
          ...formState
          //changed to above
          // email: formState.email,
          // password: password,
          // username: username, 
        },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      // username: '',
      password: '',
    });
  };

  //export const LoginForm = ({ username, password, handleUsername, handlePassword, handleLoginSubmit }) => (
  return (
    <Form size="large" onSubmit={handleLoginSubmit}>
      <Segment stacked>
        <Form.Input
          fluid
          icon={null}
          placeholder="Email"
          name="email"
          type="email"
          value={
            formState.email
            // setUsername.username
          }
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
          value={
            formState.password
            // setPassword.password
          }
          onChange={handleChange}
          required
          style={{ fontSize: '1.2em', marginBottom: '1em' }}
        />

        <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em', marginBottom: '1em' }}>
          Login
        </Button>
      </Segment>
    </Form>
  );
}