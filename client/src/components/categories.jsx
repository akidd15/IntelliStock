import { useState } from 'react';
import React from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';

// pass arrays to function from DB
export default function Categories() {
    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);

    function openModalReceipt() {
        setModalOpen(true);
    }
    
    function closeModalReceipt() {
        setModalOpen(false);
    }

    function openModalNewOrder() {
        setModalOpenNewOrder(true)
    }

    function closeModalNewOrder() {
        setModalOpenNewOrder(false);
    }

    const list = [];
    const lowInventory = [];

    return (
        <>
          <h2>(list name)</h2>
          {/* add page navigation logic to button */}
          <button>Back to Home</button>
          <div className="container">
            <h3>Items</h3>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
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