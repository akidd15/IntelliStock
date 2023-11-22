import React from 'react';
import { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';

export default function Receipt({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [item, setItem] = useState('');
  const currentDate = new Date().toLocaleDateString();

  const list = [];

  function handleItem(e, { value }) {
    setItem(value);
  }

  function handleQuantity(e, { value }) {
    setQuantity(value);
  }

  function handlePrice(e, { value }) {
    setPrice(value);
  }

  function resetForm() {
    setQuantity('');
    setPrice('');
    setItem('');
  }

  function handleSubmit() {
    console.log('Receipt successfully created:', {
      date: currentDate,
      item: item,
      quantity: quantity,
      price: price
    })

    resetForm();
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Create New Receipt</Modal.Header>
      <Modal.Content>
        <div>{currentDate}</div>
        <Dropdown
          placeholder='Select Item'
          fluid
          selection
          options={list.map(item => ({ text: item, value: item }))}
          onChange={handleItem}
        />
        <Input
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantity}
        />
        <Input
          placeholder="Price"
          value={price}
          onChange={handlePrice}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

