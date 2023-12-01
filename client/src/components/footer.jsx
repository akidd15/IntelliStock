import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '1em 0', backgroundColor: '#2c3e50', position: 'absolute', bottom: 0, width: '100%'  }}>
      <Container textAlign="center">
        <p style={{ color: 'white' }}>© 2023 IntelliStock. All rights reserved.</p>
      </Container>
    </Segment>
  );
};

export default Footer;
