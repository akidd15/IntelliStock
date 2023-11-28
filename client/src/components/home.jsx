import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    // state to hold list item
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [popUp, setPopUp] = useState(false);

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategory([ ...category, newCategory]);
            setNewCategory('');
            // open the pop up to notify the user "Category added successfully!"
            setPopUp(true);

        }
    };

    const closePopUp = () => {
        setPopUp(false);
    };

    return (
        <div className="main-container">
            <div className="list-container">
            <h1>Welcome!</h1>
            <h3>My Categories</h3>
        <ul>
            {category.map((category, index) => (
                <li key={index}>
                    <Link to={`/categories/${index}`}>{category}</Link>
                </li>
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
        
        {popUp && (
            <div className="pop-up-container">
                <div className="pop-up-content">
                    <span className="close" onClick={closePopUp}>
                        &times;
                    </span>
                    <p> New Category added successfully!</p>
                </div>
                </div>
        )}
        </div>
    );
};

export default Home;