import React from 'react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { QUERY_ITEMS_BY_AUTHOR } from '../utils/queries';
import { QUERY_CATEGORIES } from '../utils/queries'
// import { LOGIN_USER } from '../utils/mutations';
import { ADD_ITEM, UPDATE_ITEM } from '../utils/mutations';
// import { ADD_CATEGORY } from '../utils/mutations';
export default function newOrder({ isOpen, onClose, items }) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [names, setNames] = useState('');
  const [itemId, setItemId] = useState();
  const [newOrderItems, setnewOrderItems] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  //const [addItem] = useMutation(ADD_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);
  //const list = [];

  function handleItem(e, { value }) {

    setNames(value[1]);
    setItemId(value[0]);

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
    setNames('');
    setnewOrderItems([]);
  }
  async function handleSubmit() {
    // try {
    //   if (loading) {
    //     console.log('Loading data...');
    //     return;
    //   }

    //   // Check for errors
    //   if (error) {
    //     console.error('Error loading data:', error);
    //     return;
    //   }

    //  const currentItem = data?.itemsByAuthor?.[0];
      // console.log(currentItem);
      // if (!currentItem) {
      //   console.error('Item not found');
      //   return;
      // }
      // const updatedQuantity = quantity + parseInt(quantity);
      /* Fetch the current item details using its ID or any other identifier */;

    // Use the addItem mutation to add the item to your database

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Receipt successfully created:', {
        // date: currentDate,
        id: itemId,
        item: names,
        quantity: quantity,
        price: price
      });

      await updateItem({
        variables: {
          itemsId: itemId,
          itemName: names,
          quantity: parseInt(updatedQuantity), // Convert quantity to integer
          price: parseFloat(price),    // Convert price to float
        },
        refetchQueries: [{ query: QUERY_ITEMS_BY_AUTHOR }, { query: QUERY_CATEGORIES }],
      });
      console.log(updateItem);

      console.log('Item added successfully to the database');
      resetForm();
      onClose();
      // } catch (error) {
      //   console.error('Error adding item to the database', error);
      // }
    }
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Modal.Header>Create New Order</Modal.Header>
        <Modal.Content>
          <label>New Order:</label>
          <Dropdown
            placeholder='Select Item'
            fluid
            selection
            options={items.map(item => ({ value: [item._id, item.itemName], text: item.itemName }))}
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
                  // options={items.map(item => ({ value: [item._id, item.itemName], text: item.itemName }))}
                  // onChange={handleItem}

                
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
          {/* <Button type="button" onClick={handleAddItem}>
          Add Item
        </Button> */}
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
  }};