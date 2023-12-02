import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Input, Message } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';

export default function Receipt({ isOpen, onClose, items }) {
  // State variables
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [names, setNames] = useState('');
  const [oldQuantity, setOldQuantity] = useState('');
  const [itemId, setItemId] = useState(null);
  const [updateItem, { error }] = useMutation(UPDATE_ITEM);
  const [errorText, setErrorText] = useState('');

  // Effect to set original price when an item is selected
  useEffect(() => {
    setOriginalPrice(price);
  }, [itemId, price]);

  // Event handler for selecting an item from the dropdown
  function handleItem(e, { value }) {
    setNames(value[1]);
    setItemId(value[0]);
    setOldQuantity(value[2]);
    setErrorText('');
  }

  // Event handler for quantity input
  function handleQuantity(e, { value }) {
    if (value !== null && !isNaN(value)) {
      setQuantity(value);
    }
  }

  // Event handler for price input
  function handlePrice(e, { value }) {
    console.log('Value:', value);

    if (value !== null && value !== undefined && value !== '') {
      setPrice(value);
    } else {
      console.log('test');
      setOriginalPrice(value);
    }
  }

  // Function to reset form state
  function resetForm() {
    setQuantity('');
    setPrice('');
    setNames('');
    setItemId(null);
    setErrorText('');
  }

  // Submit form handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (itemId === null) {
      setErrorText('Please select an item.');
      return;
    }

    try {
      setOldQuantity(Number(oldQuantity) - Number(quantity));

      // Use the updateItem mutation
      await updateItem({
        variables: {
          itemId: itemId,
          itemName: names,
          quantity: Number(oldQuantity - quantity),
          price: price !== '' ? Number(price) : undefined,
        },
      });

      // Reset the form and close the modal
      resetForm();
      onClose();
    } catch (error) {
      setOldQuantity(oldQuantity);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOnDimmerClick={false}>
      <Modal.Header>Create New Receipt</Modal.Header>
      <Modal.Content>
        {errorText && (
          <Message negative>
            <Message.Header>{errorText}</Message.Header>
          </Message>
        )}
        <p>Used some of your inventory? Create a receipt to keep track of what you used and update stock!</p>
        <div>
          <Dropdown.Header>Select Item</Dropdown.Header>
          <Dropdown
            placeholder='Select Item'
            fluid
            selection
            options={items.map(item => ({
              value: [item._id, item.itemName, item.quantity, item.price],
              text: item.itemName,
            }))}
            onChange={handleItem}
          />
        </div>
        <div>
          <label htmlFor='quantity'>Quantity Used</label>
          <br />
          <Input
            id='quantity'
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantity}
          />
        </div>
        <div>
          <label htmlFor='price'>Price</label>
          <br />
          <Input
            id='price'
            placeholder="Price"
            value={price}
            onChange={handlePrice}
          /> <p> Note: (Leave blank if prices haven't changed)</p>
        </div>
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
}
