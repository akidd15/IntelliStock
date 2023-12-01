import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';
import { Modal, Button, Dropdown, Input } from 'semantic-ui-react';

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
                    // need to set up a form
                    quantity: 10,
                    // these are hard coded
                    price: 4
                },
            });

            setNewItem('');
            resetForm();
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
                <label>Name:</label>
                <Input
                    placeholder="Item Name"
                    value={newItem}
                    onChange={handleItem}
                />
                <label>Quantity:</label>
                <Input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={handleQuantity}
                />
                <label>Price:</label>
                <Input
                    placeholder="Price"
                    value={price}
                    onChange={handlePrice}
                />
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