import React, { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';


export default function NewOrder({ isOpen, onClose, items }) {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [orderNames, setOrderNames] = useState('');
  const [orderOldQuantity, setOrderOldQuantity] = useState('');
  const [orderItemId, setOrderItemId] = useState();
  const [updateOrderItem, {error, data}] = useMutation(UPDATE_ITEM);
  // const currentDate = new Date().toLocaleDateString();


  function handleOrderItem(e, { value }) {

    setOrderNames(value[1]);
    setOrderItemId(value[0]);
    setOrderOldQuantity(value[2]);
  }

  function handleOrderQuantity(e, { value }) {
    setOrderQuantity(value);
  }

  function handleOrderPrice(e, { value }) {
    setOrderPrice(value);
  }

  function resetOrderForm() {
    setOrderQuantity('');
    setOrderPrice('');
    setOrderNames('');
  }
  
  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    await updateOrderItem({
      variables: {
        itemId: orderItemId,
        itemName: orderNames,
        quantity: Number(orderOldQuantity) + Number(orderQuantity),
        price: Number(orderPrice)
      }
    });
    
    resetOrderForm();
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Create New Order (add quantity)</Modal.Header>
      <Modal.Content>
        
        <Dropdown.Header>Item to be increased:</Dropdown.Header>
        <Dropdown
          id = 'orderItem'
          placeholder='Select Item'
          fluid
          selection
          options={items.map(item => ({ value: [item._id, item.itemName, item.quantity], text: item.itemName }))}
          onChange={handleOrderItem}
        />
        

        <label htmlFor='orderQuantity'>Quantity:</label>
        <Input
          id="orderQuantity"
          placeholder="Quantity"
          value={orderQuantity}
          onChange={handleOrderQuantity}
        />


        <label htmlFor='orderPrice'>Price:</label>
        <Input
          id="orderPrice"
          placeholder="Price"
          value={orderPrice}
          onChange={handleOrderPrice}
        />       
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => { resetOrderForm(); onClose(); }}>
          Cancel
        </Button>
        <Button color='green' onClick={handleOrderSubmit}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
}