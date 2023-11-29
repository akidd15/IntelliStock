import React from 'react';
import { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
// import { useMutation } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";
// import { QUERY_ITEM } from '../utils/queries';
// import { QUERY_CATEGORY } from '../utils/queries'
// import { LOGIN_USER } from '../utils/mutations';
// import { ADD_ITEM, REMOVE_ITEM } from '../utils/mutations';
// import { ADD_CATEGORY } from '../utils/mutations';
export default function Receipt({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [item, setItem] = useState('');
  const [newOrderItems, setnewOrderItems] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  const list = ['Item1','Item2','Item3'];

  function handleItem(e, { value }) {
    setItem(value);
  }
  function handleQuantity(e, { value }) {
    setQuantity(value);
  }
  function handlePrice(e, { value }) {
    setPrice(value);
  }
  function handleAddItem() {
    const newItem = {
      itemName: '',
      price: '',
      quantity: '',
    };
    setnewOrderItems([...newOrderItems, newItem]);
  }
  function resetForm() {
    setQuantity('');
    setPrice('');
    setItem('');
    setnewOrderItems([]);
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
      <label>Receipt Items:</label>
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
        {newOrderItems.map((item, index) => (
          <div key={index}>
            <label>
              New Item:
              <Dropdown
                placeholder='Select Item'
                fluid
                selection
                options={list.map(item => ({ text: item, value: item }))}
                onChange={handleItem}
              />
            </label>
            <Input
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handlenewOrderItemChange(index, 'quantity', e.target.value)}
            />
            <Input
              placeholder="Price"
              value={item.price}
              onChange={(e) => handlenewOrderItemChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddItem}>
          Add Item
        </Button>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => { resetForm(); onClose(); }}>
          Cancel
        </Button>
        <Button color='green' onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};