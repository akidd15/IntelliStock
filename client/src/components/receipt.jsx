import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function Receipt({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Create New Receipt</Modal.Header>
      <Modal.Content>
        
        Receipt information here

      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={onClose}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

