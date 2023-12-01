import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import AddItem from './addItem';

export default function Categories() {
    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);
    const [modalOpenAddItem, setModalOpenAddItem] = useState(false);

    const { categoryId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId },
    });
    const category = data?.category || [];
    const items = category.items || [];

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
        setModalOpenNewOrder(true);
    }

    function closeModalNewOrder() {
        setModalOpenNewOrder(false);
    }

    return (
        <>
            <h2>{category.categoryName}</h2>
            
            <Link to="/home">
                <button>Back to Home</button>
            </Link>

            <button onClick={openModalAddItem}>Add Item</button>

            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />

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
    );
}