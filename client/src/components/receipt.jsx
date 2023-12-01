import { useState } from 'react';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM } from '../utils/mutations';


export default function Receipt({ isOpen, onClose, items }) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [names, setNames] = useState('');
  const [receiptItems, setReceiptItems] = useState([]);
  const [itemId, setItemId] = useState();
  const [updateItem, {error, data}] = useMutation(UPDATE_ITEM);
  // const currentDate = new Date().toLocaleDateString();

  const list = [
    'Item1',
    'Item2',
    'Item3'
  ];
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

  // Function not currently in use.
  function handleAddItem() {
    const newItem = {
      itemName: '',
      price: '',
      quantity: '',
    };
  
    setReceiptItems([...receiptItems, newItem]);
  }

  function resetForm() {
    setQuantity('');
    setPrice('');
    setNames('');
    setReceiptItems([]);
  }

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
        itemId: itemId,
        itemName: names,
        quantity: Number(quantity),
        price: Number(price)
      }
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
          options= {items.map(item => ({ value: [item._id, item.itemName], text: item.itemName }))}
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

        {receiptItems.map((item, index) => (
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
              onChange={(e) => handleReceiptItemChange(index, 'quantity', e.target.value)}
            /> 
            <Input
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleReceiptItemChange(index, 'price', e.target.value)}
            />           
          </div>
        ))}
        {/* Striving for MVP. Feature not yet ready
        
        <Button type="button" onClick={handleAddItem}>
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
};