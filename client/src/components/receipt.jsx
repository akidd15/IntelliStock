import React, { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';


export default function Receipt({ isOpen, onClose, items }) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [names, setNames] = useState('');
  const [oldQuantity, setOldQuantity] = useState('');
  const [itemId, setItemId] = useState();
  const [updateItem, {error, data}] = useMutation(UPDATE_ITEM);
  // const currentDate = new Date().toLocaleDateString();
  

  function handleItem(e, { value }) {
    
    setNames(value[1]);
    setItemId(value[0]);
    setOldQuantity(value[2]);
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await updateItem({
      variables: {
        itemId: itemId,
        itemName: names,
        quantity: Number(oldQuantity - quantity),
        price: Number(price)
      }
    });

    resetForm();
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Create New Receipt (subtracted)</Modal.Header>
      <Modal.Content>
        <Dropdown.Header>Items used:</Dropdown.Header>
        <Dropdown
          placeholder='Select Item'
          fluid
          selection
          options={items.map(item => ({ value: [item._id, item.itemName, item.quantity], text: item.itemName }))}
          onChange={handleItem}
        />
        <label htmlFor='quantity'>How many were used?</label>
        <br></br>
        <Input
          id='quantity'
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantity}
        />
        <br></br>
        <label htmlFor='price'>New price?</label>
        <br></br>
        <Input
          id='price'
          placeholder="Price"
          value={price}
          onChange={handlePrice}
        />
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