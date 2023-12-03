import React, { useState } from 'react';
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';
// passing in currentData to test a theory
export default function NewOrder({ isOpen, onClose, itemId, name, quantity, price }) {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  // why does this exist? Might be useful for varifying
  const [orderOldQuantity, setOrderOldQuantity] = useState('');
  
  const [updateOrderItem] = useMutation(UPDATE_ITEM);
  const [errorText, setErrorText] = useState('');

  function handleOrderQuantity(e, { value }) {
    setOrderQuantity(value);
  }

  function handleOrderPrice(e, { value }) {
    setOrderPrice(value);
  }

  function resetOrderForm() {
    setOrderQuantity('');
    setOrderPrice('');
    setErrorText('');
  }

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    if (itemId === null) {
      setErrorText('Please select an item.');
      return;
    }

    try {
      // what does this do?
      setOrderOldQuantity(Number(quantity) + Number(orderQuantity));

      await updateOrderItem({
        variables: {
          itemId: itemId,
          itemName: name,
          quantity: Number(quantity) + Number(orderQuantity),
          price: orderPrice !== '' ? Number(orderPrice) : undefined,
        }
      });

      resetOrderForm();
      onClose();
    } catch (error) {
      // what is this?
      setOrderOldQuantity(quantity);
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose} closeOnDimmerClick={false}>
      <Modal.Header>Create New Order</Modal.Header>
      <Modal.Content>
      <p>Create a new order when you would like to add more stock to inventory!</p>
        {errorText && (
          <Message negative>
            <Message.Header>{errorText}</Message.Header>
          </Message>
        )}

        {/* new for currentData */}
        <h1>{name}</h1>

        <label htmlFor='orderQuantity'>Current quantity: {quantity} +</label>
        
        <Input
          id="orderQuantity"
          placeholder="Quantity"
          value={orderQuantity}
          onChange={handleOrderQuantity}
        />

        <br />
        <label htmlFor='orderPrice'>Current price: ${price} New price: </label>
        
        <Input
          id="orderPrice"
          placeholder="Price"
          value={orderPrice}
          onChange={handleOrderPrice}
        />
        <p> Note: (Leave blank if prices have not changed)</p>
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
