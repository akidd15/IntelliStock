import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';
import { Modal, Button, Input } from 'semantic-ui-react';

// pass arrays to function from DB
export default function AddItem({ isOpen, onClose }) {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [newItem, setNewItem] = useState('');
    const [addItem, { error }] = useMutation(
        ADD_ITEM, {
        // allows page to update immediately
        refetchQueries: [
            QUERY_SINGLE_CATEGORY,
        ]
    }
    );
    // grabs categoryId from route :categoryId
    const { categoryId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId },
    });
    const category = data?.category || [];
    const items = category.items || [];

    function handleItem(e, { value }) {
        setNewItem(value);
    }

    function handleQuantity(e, { value }) {
        setQuantity(value);
    }

    function handlePrice(e, { value }) {
        setPrice(value);
    }

    const handleAddItem = async (event) => {

        event.preventDefault();

        try {
            const { data } = await addItem({
                variables: {
                    categoryId: categoryId,
                    itemName: newItem,
                    quantity: parseInt(quantity),
                    price: parseFloat(price)
                },
            });

            setNewItem('');
            resetForm();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    function resetForm() {
        setQuantity('');
        setPrice('');
        setNewItem('');
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Header>Add New Item</Modal.Header>
            <Modal.Content>
                <div>
                    <label htmlFor='newItem'><b>Enter Item Name</b></label>
                    <Input style={{ marginLeft: '10px' }}
                        id='newItem'
                        placeholder="Item Name"
                        value={newItem}
                        onChange={handleItem}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor='quantity'><b>Enter a Quantity</b></label>
                    <Input style={{ marginLeft: '10px' }}
                        id='quantity'
                        placeholder="Quantity"
                        value={quantity}
                        onChange={handleQuantity}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor='price'><b>Enter Item Price</b></label>
                    <Input style={{ marginLeft: '10px' }}
                        id='price'
                        placeholder="Price"
                        value={price}
                        onChange={handlePrice}
                    />
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => { resetForm(); onClose(); }}>
                    Cancel
                </Button>
                <Button color='green' onClick={handleAddItem}>
                    Submit
                </Button>
            </Modal.Actions>
        </Modal>
    )
}