import { useState } from 'react';
import React from 'react';
import Receipt from './receipt';

// pass arrays to function from DB
export default function Categories() {
    const [modalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }
    
    function closeModal() {
        setModalOpen(false);
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

          <button>New Order</button>

          <button onClick={openModal}>Receipt</button>

          <Receipt isOpen={modalOpen} onClose={closeModal} />
        </>
    )
};