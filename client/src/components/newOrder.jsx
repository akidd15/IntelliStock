import React from "react";
import { useState } from "react";
import { Modal, Button } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";


const newOrder = ({ isOpen, onClose, categories, existingItems, onUpdateOrder }) => {
    const [order, setOrder] = useState({
        category: '',
        date: '',
        items: [],
    });

    const handleCategoryChange = (e) => {
        setOrder({ ...order, category: e.target.value });
    };

    const handleDateChange = (e) => {
        setOrder({ ...order, date: e.target.value });
      };
    

    const handleAddItem = () => {
        // check if item exists
        const existingItemIndex = order.items.findIndex(
            (item) => item.itemName === order.items[order.items.length - 1].itemName
            );
            // checks if item already exsists to update item
        if (existingItemIndex !== -1) {
            const updatedItems = [...order.items];
            const existingItem = updatedItems[existingItemIndex];
            const newItem = { ...existingItem, quantity: existingItem.quantity + 1 };
            updatedItems[existingItemIndex] = newItem;
            setOrder({ ...order, items: updatedItems });
            } else {
        // if item doesn't exist, create a new item
        const newItem = {
            itemName: '',
            price: '',
            quantity: 0,
        };

        setOrder({ ...order, items: [...order.items, newItem] });
    }
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...order.items];
        updatedItems[index][field] = value;

        setOrder({ ...order, items: updatedItems });
    };

    const handleExistingItemSelect = (index, itemName) => {
        const updatedItems = [...order.items];
        updatedItems[index].itemName = itemName;

        setOrder({ ...order, items: updatedItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted New Order:", order);
        onUpdateOrder(order);
        // reset form
        setOrder({
            category: '',
            date: '',
            items: [],
        });
        onClose();

    };
    // allows category drop down list
    const categories = ["Home", "Office"];


    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Header>Create New Order</Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <label>
                        Category:
                        <select value={order.category} onChange={handleCategoryChange}>
                            <option value='' disabled>
                                Select a Category
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
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
                                list={`existingItems-${index}`}
                                />
                                <datalist id={`existingItems-${index}`}>
                                    {existingItems[order.category]?.map((existingItem) => (
                                        <option key={existingItem} value={existingItem} />
                                    ))}
                                </datalist>
                                <Button type="button"
                                 onClick={() => handleExistingItemSelect(index, item.item)}
                                 >
                                    Use Existing
                                </Button>
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