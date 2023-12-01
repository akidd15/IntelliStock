import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import { ADD_ITEM } from '../utils/mutations';
import AddItem from './addItem';

// pass arrays to function from DB
export default function Categories() {
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
    console.log(items);

    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);
    const [modalOpenAddItem, setModalOpenAddItem] = useState(false);

    function openModalAddItem() {
        setModalOpenAddItem(true);
    }

    function closeModalAddItem() {
        setModalOpenAddItem(false);
    }

    function openModalReceipt() {
        setModalOpenReceipt(true);
    }

    function closeModalReceipt() {
        setModalOpenReceipt(false);
    }

    function openModalNewOrder() {
        setModalOpenNewOrder(true)
    }

    function closeModalNewOrder() {
        setModalOpenNewOrder(false);
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

        } catch (err) {
            console.error(err);
        }
    };


    const lowInventory = [];

    return (
        <>
            <h2>{category.categoryName}</h2>
            <Link to="/home">
                <button>Back to Home</button>
            </Link>
            <div className="container">
                <h3>Items</h3>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            name: {item.itemName} quantity: {item.quantity} price: {item.price}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container">
                <div>
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter a new item name"
                    />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>
                <h3>Low Inventory</h3>
                <ul>
                    {lowInventory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <button onClick={openModalAddItem}>Add Item</button>

            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />

            <button onClick={openModalNewOrder}>New Order</button>

            <NewOrder
                isOpen={modalOpenNewOrder}
                onClose={closeModalNewOrder}
                items={items}
            />

            <button onClick={openModalReceipt}>Receipt</button>

            <Receipt
                isOpen={modalOpenReceipt}
                onClose={closeModalReceipt}
                items={items}
            />
        </>
    )
};