import React, { useState } from 'react';
import { Modal, Button, Dropdown, Input, Message } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';

export default function NewOrder({ isOpen, onClose, items }) {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [orderNames, setOrderNames] = useState('');
  const [orderOldQuantity, setOrderOldQuantity] = useState('');
  const [orderItemId, setOrderItemId] = useState(null);
  const [updateOrderItem, { error, data }] = useMutation(UPDATE_ITEM);
  const [errorText, setErrorText] = useState('');

  function handleOrderItem(e, { value }) {
    setOrderNames(value.itemName);
    setOrderItemId(value._id);
    setOrderOldQuantity(value.quantity);
    setErrorText('');
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

    if (orderItemId === null) {
      setErrorText('Please select an item.');
      return;
    }

    try {
      setOrderOldQuantity(Number(orderOldQuantity) + Number(orderQuantity));

      await updateOrderItem({
        variables: {
          itemId: orderItemId,
          itemName: orderNames,
          quantity: Number(orderOldQuantity) + Number(orderQuantity),
          price: orderPrice !== '' ? Number(orderPrice) : undefined,
        }
      });

      resetOrderForm();
      onClose();
    } catch (error) {
      setOrderOldQuantity(orderOldQuantity);
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
        <Dropdown.Header>Select Item</Dropdown.Header>
        <Dropdown
          fluid
          placeholder='Select Item'
          selection
          options={items.map(item => ({ value: item, text: item.itemName }))}
          onChange={handleOrderItem}
        />

        <label htmlFor='orderQuantity'>Quantity Ordered</label>
        <br />
        <Input
          id="orderQuantity"
          placeholder="Quantity"
          value={orderQuantity}
          onChange={handleOrderQuantity}
        />

        <br />
        <label htmlFor='orderPrice'>Price</label>
        <br />
        <Input
          id="orderPrice"
          placeholder="Price"
          value={orderPrice}
          onChange={handleOrderPrice}
        />
        <p> Note: (Leave blank if prices haven't changed)</p>
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
