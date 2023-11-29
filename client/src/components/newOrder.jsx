import React from "react";
import { useState } from "react";
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
// import { useMutation } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";
// import { QUERY_ITEM } from '../utils/queries';
// import { QUERY_CATEGORY } from '../utils/queries'
// import { LOGIN_USER } from '../utils/mutations';
// import { ADD_ITEM, REMOVE_ITEM } from '../utils/mutations';
// import { ADD_CATEGORY } from '../utils/mutations';
// import "react-datepicker/dist/react-datepicker.css";


export default function newOrder({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState('');
  //const [initialQuantity, setInitialQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [item, setItem] = useState('');
  const [newOrderItems, setNewOrderItems] = useState([]);
  const currentDate = new Date().toLocaleDateString();
 // const [minQuantity, setMinQuantity] = useState('');

  const list = ['Item1', 'Item2', 'Item3'];

  // function handleMinQuantity(e, { value }) {
  //   setMinQuantity(value);
  // }

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
      itemName: item,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      // minQuantity: parseInt(minQuantity),
      // isLow: parseInt(quantity) < parseInt(minQuantity), // Check if quantity is below minimum
    };
    // const newItem = {
    //   itemName: '',
    //   price: '',
    //   quantity: '',
    // };

    setNewOrderItems([...newOrderItems, newItem]);
  }

  function handleNewOrderItemChange(index, key, value) {
    const updatedItems = [...newOrderItems];
    updatedItems[index][key] = value;

    // Update isLow flag when quantity or minQuantity changes
    // if (key === 'quantity' || key === 'minQuantity') {
    //   updatedItems[index].isLow = parseInt(updatedItems[index].quantity) < parseInt(updatedItems[index].minQuantity);

    // }

    setNewOrderItems(updatedItems);
  }

  function resetForm() {
    setQuantity('');
    setPrice('');
    setItem('');
   // setMinQuantity('');
    setNewOrderItems([]);
  }

  function handleSubmit() {
    console.log('New Order successfully created:', {
      date: currentDate,
      item: item,
      quantity: quantity,
      price: price
      //minimum: minimumqty
    });

    resetForm();
    onClose();
  }


  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Create New Order</Modal.Header>
      <Modal.Content>
        <label>New Items:</label>
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
        <Input
          placeholder="Minimum Quantity"
          value={item.minQuantity}
          onChange={(e) => handleNewOrderItemChange(item, 'minQuantity', e.target.value)}
        />
      


        {newOrderItems.map((item, index) => (
          <div key={index} className={item.isLow ? 'low-item' : ''}>
            <label>
              New Item:
              <Dropdown
                placeholder='Select Item'
                fluid
                selection
                options={list.map(item => ({ text: item, value: item }))}
                onChange={(e, { value }) => handleNewOrderItemChange(index, 'itemName', value)}
              />
            </label>
            <Input
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleNewOrderItemChange(index, 'quantity', e.target.value)}
            />
            <Input
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleNewOrderItemChange(index, 'price', e.target.value)}
            />
            <Input
              
              placeholder="Minimum Quantity"
              value={isNaN(item.minQuantity) ? '' : item.minQuantity}
              onChange={(e) => handleNewOrderItemChange(index, 'minQuantity', e.target.value)}
            />

            {item.isLow && <span className="low-item-indicator">Low Quantity!</span>}
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
