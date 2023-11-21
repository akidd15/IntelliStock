import { useState } from 'react';
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react';

export default function Landing() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User: ' + username);
    console.log('Password: ' + password);
    // Login logic here
  };

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh', backgroundColor: '#2c3e50', color: 'white', margin: 0, padding: 0  }}
      verticalAlign="middle"
      stackable
    >
      <Grid.Column style={{ maxWidth: '400px', minWidth: '300px', width: '70%', margin: 0 }}>
        <Header as="h1" textAlign="center" style={{ color: 'white' }}>
          IntelliStock
        </Header>
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
            
            <Button color="green" fluid size="large" type="submit" style={{ fontSize: '1.2em' }}>
              Login
            </Button>
          </Segment>
        </Form>
        <p style={{ marginTop: '1em', color: 'white' }}>
          Don't have an account? <a href="/signup">Sign up here</a>.
        </p>
      </Grid.Column>
    </Grid>
  );
}
