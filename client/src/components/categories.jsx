import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';

// pass arrays to function from DB
export default function Categories() {
    // grabs categoryId from route :categoryId
    const { categoryId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId },
    });
    const category = data?.category || [];
    const items = category.items || [];

    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);

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

    // const list = [];
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
                        name: {item.itemName} quantity: {item.quantity} price {item.price}
                    </li>
                ))}
            </ul>
          </div>
          <div className="container">
            <h3>Low Inventory</h3>
            <ul>
                {lowInventory.map((item, index) => (
                        <li key={index}>{item}</li>
                ))}
            </ul>
          </div>

          <button onClick={openModalNewOrder}>New Order</button>

          <NewOrder isOpen={modalOpenNewOrder} onClose={closeModalNewOrder} />

          <button onClick={openModalReceipt}>Receipt</button>

          <Receipt isOpen={modalOpenReceipt} onClose={closeModalReceipt} />
        </>
    )
};