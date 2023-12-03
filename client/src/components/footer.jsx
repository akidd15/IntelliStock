import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment inverted vertical style={{
      padding: '1em 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 100,
      background: 'white'

    }}>
      <Container textAlign="center">
        <p style={{ color: 'black' }}>© 2023 IntelliStock. All rights reserved.</p>
      </Container>
    </Segment>
  );
};

export default Footer;

