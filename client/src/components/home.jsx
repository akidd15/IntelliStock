import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { Input, Button, List, Grid, Card } from "semantic-ui-react";
import Auth from '../utils/auth';
import './home.css'

const Home = () => {
  const [newCategory, setNewCategory] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [addCategory, { error }] = useMutation(
    ADD_CATEGORY,
    {
      refetchQueries: [
        QUERY_USER,
      ],
    }
  );
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });
  const user = data?.user || [];
  const categories = user.categories || [];

  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCategory({
        variables: {
          categoryName: newCategory,
          categoryAuthor: Auth.getProfile().data.username,
        },
      });

      setNewCategory('');
      setPopUp(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  return (
    <div className="main-container" style={{ backgroundColor: '#2c3e50', color: 'white', height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div className="list-container" style={{ textAlign: 'center', width: '50%' }}>
        <h1 style={{ paddingTop: '30px', paddingBottom: '10px', marginTop: 0 }}>Welcome, {user.username}!</h1>
        <h3 style={{ paddingBottom: '20px', fontSize: '30px' }}>My Categories</h3>
        {/* Render Cards as Links */}
        <Card.Group className="card-container" itemsPerRow={4} style={{ paddingBottom: '20px' }}>
          {categories.map((category) => (
            <Card
              key={category._id}
              as={Link}
              to={`/categories/${category._id}`}
              className="card"
              // style={{
              //   backgroundColor: '#026aab',
              //   width: '150px',
              //   height: '150px',
              //   boxShadow: '0 2px 4px teal'
              // }}
            >
              <Card.Content>
                <Card.Header className='dynamic-font-size card-header' style={{ marginTop: '40px', color: 'white' }}>
                  {category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}
                </Card.Header>
                {/* Add more details as needed */}
                {/* <Card.Description>{category.description}</Card.Description> */}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Input
          fluid
          icon="tags"
          iconPosition="left"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ width: '100%', paddingBottom: '10px' }}
        />
        <Button color="blue" onClick={handleAddCategory}>Add Category</Button>
      </div>
      {popUp && (
        <div className="pop-up-container">
          <div className="pop-up-content">
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
