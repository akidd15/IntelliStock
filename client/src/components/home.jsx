import React from "react";
import { useState } from "react";
const CategoryComponent = () => {
    // state to hold list item
    const [category, setCategory] = useState(['Office', 'Home']);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategory([ ...category, newCategory]);
            setNewCategory('');
        }
    };
    

    return (
        <div className="main-container">
            <div className="list-container">
            <h2>Welcome!</h2>
        <ul>
            {category.map((category, index) => (
                <li key={index}>{category}</li>
            ))}
        </ul>

        <div>
            <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter a new category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
        </div>
        <div className="low-items">
            <h3> Low Items </h3>
        </div>
        </div>
    );
};

export default CategoryComponent;