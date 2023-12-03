import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Message } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';

export default function Receipt({ 
  isOpen, 
  onClose, 
  currentItemId, 
  currentName, 
  currentQuantity, 
  currentPrice }) {
  // State variables
  const [receiptQuantity, setReceiptQuantity] = useState('');
  const [receiptPrice, setReceiptPrice] = useState('');
  
  const [oldQuantity, setOldQuantity] = useState('');
  
  const [updateItem, { error }] = useMutation(UPDATE_ITEM);
  const [errorText, setErrorText] = useState('');

  // Effect to set original price when an item is selected
  // useEffect(() => {
  //   setOriginalPrice(price);
  // }, [itemId, price]);

  // Event handler for selecting an item from the dropdown
  // function handleItem(e, { value }) {
  //   setNames(value[1]);
  //   setItemId(value[0]);
  //   setOldQuantity(value[2]);
  //   setErrorText('');
  // }

  // Event handler for quantity input
  function handleQuantity(e, { value }) {
    if (value !== null && !isNaN(value)) {
      setReceiptQuantity(value);
    }
  }

  // Event handler for price input
  function handlePrice(e, { value }) {
    console.log('Value:', value);

    if (value !== null && value !== undefined && value !== '') {
      setReceiptPrice(value);
    } else {
      console.log('test');
      // setOriginalPrice(value);
    }
  }

  // Function to reset form state
  function resetForm() {
    setReceiptQuantity('');
    setReceiptPrice('');
    setErrorText('');
  }

  // Submit form handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentItemId === null) {
      setErrorText('Please select an item.');
      return;
    }

    try {
      setOldQuantity(Number(oldQuantity) - Number(receiptQuantity));

      // Use the updateItem mutation
      await updateItem({
        variables: {
          itemId: currentItemId,
          itemName: currentName,
          quantity: Number(currentQuantity - receiptQuantity),
          price: receiptPrice !== '' ? Number(receiptPrice) : undefined,
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
         <h1>{currentName}</h1>
        </div>
        <div>
          <label htmlFor='receiptQuantity'>Current quantity: {currentQuantity} -</label>
          
          <Input
            id='receiptQuantity'
            placeholder="Quantity"
            value={receiptQuantity}
            onChange={handleQuantity}
          />
        </div>
        <div>
          <label htmlFor='receiptPrice'>Current price: ${currentPrice} New price: </label>
          
          <Input
            id='receiptPrice'
            placeholder="Price"
            value={receiptPrice}
            onChange={handlePrice}
          /> <p> Note: (Leave blank if prices have not changed)</p>
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
