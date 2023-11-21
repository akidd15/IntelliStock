import React from "react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


const NewOrderForm = () => {
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
        <div>
          <h2>New Order Form</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Category:
              <select value={order.category} onChange={handleCategoryChange}>
                <option value="" disabled>
                  Select a category
                </option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Date:
              <DatePicker selected={order.date} onChange={handleDateChange} />
            </label>
            <br />
    
            {order.items.map((item, index) => (
              <div key={index}>
                <h3>Item {index + 1}</h3>
                <label>
                  Item Name:
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(index, "itemName", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Price:
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </label>
                <br />
              </div>
            ))}
    
            <button type="button" onClick={handleAddItem}>
              Add Item
            </button>
    
            <br />
            <button type="submit">Submit Order</button>
          </form>
        </div>
      );
    };
    
    export default NewOrderForm;
