import React from 'react';

// pass arrays to function from DB
export default function Categories() {
    return (
        <>
          <h2>(list name)</h2>
          {/* add page navigation logic to button */}
          <button>My Lists</button>
          <div className="container">
            <h3>Items</h3>
            <ul>
                {/* list.map((item, index) => (
                    <li key={index}>{item}</li>
                )) */}
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
          </div>
          <div className="container">
            <h3>Low Inventory</h3>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
          </div>
        </>
    )
};