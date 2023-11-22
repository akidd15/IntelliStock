import React from "react";
import { useState } from "react";
import { Modal, Button } from 'semantic-ui-react';
// import "react-datepicker/dist/react-datepicker.css";


const newOrder = ({ isOpen, onClose }) => {
    const [order, setOrder] = useState({
        category: '',
        date: '',
        items: [],
    });

    const handleCategoryChange = (e) => {
        setOrder({ ...order, category: e.target.value });
    };

    const handleDateChange = (e) => {
        setOrder({ ...order, date });
    };

    const handleAddItem = () => {
        const newItem = {
            itemName: '',
            price: '',
            quantity: '',
        };

        setOrder({ ...order, items: [...order.items, newItem] });
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...order.items];
        updatedItems[index][field] = value;

        setOrder({ ...order, items: updatedItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted New Order:", order);
        //add logic to add quantity to exsisting item amount

    };
    // allows category drop down list
    const categoryOptions = ["Home", "Office"];


    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Header>Create New Order</Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category:
                        <select value={order.category} onChange={handleCategoryChange}>
                            {categoryOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Date:
                        <input type="date" value={order.date} onChange={handleDateChange} />
                    </label>
                    <br />
                    <label>Items:</label>
                    {order.items.map((item, index) => (
                        <div key={index}>
                            <label>
                                Item Name:
                                <input value={item.itemName}
                                onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                                />
                            </label>
                            <label>
                                Price:
                                <input value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                    <Button type="button" onClick={handleAddItem}>
                        Add Item
                    </Button>
                    <br />
                    <Button color="blue" type="submit">
                        Submit
                    </Button>
                </form>
            </Modal.Content>
        </Modal>

    );
};

export default newOrder;