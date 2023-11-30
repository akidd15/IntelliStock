
import { useState } from "react";
import { Link } from "react-router-dom";

// added for database adding and query
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../utils/mutations";
import { QUERY_CATEGORIES } from "../utils/queries";
import Auth from '../utils/auth'

const Home = () => {
    // state to hold list item
    // const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [popUp, setPopUp] = useState(false);
    // added for database
    const [addCategory, { error }] = useMutation(ADD_CATEGORY);
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];

    // added async (event)
    const handleAddCategory = async (event) => {
        // added event.preventDefault()
        event.preventDefault();

        try {
            const { data } = await addCategory({
                variables: {
                    categoryName: newCategory,
                    categoryAuthor: Auth.getProfile().data.username,
                },
            });

            setNewCategory('');
            setPopUp(true)
        } catch (err) {
            console.error(err);
        }

        // if (newCategory.trim() !== '') {
        //     setCategory([ ...category, newCategory]);
        //     setNewCategory('');
        //     // open the pop up to notify the user "Category added successfully!"
        //     setPopUp(true);

        // }
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
            {categories.map((category, index) => (
                <li key={index}>
                    <Link to={`/categories/${index}`}>{category.categoryName}</Link>
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