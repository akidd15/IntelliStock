import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { Input, Button, List, Grid } from "semantic-ui-react";
import Auth from '../utils/auth';

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
        <h1 style={{ paddingTop: '30px', paddingBottom: '10px', marginTop: 0 }}>Welcome!</h1>
        <h3 style={{ paddingBottom: '20px' }}>My Categories</h3>
        <List relaxed style={{ paddingBottom: '20px' }}>
          {categories.map((category) => (
            <List.Item key={category._id}>
              <List.Content>
                <Link to={`/categories/${category._id}`} style={{ color: 'white', textDecoration: 'none' }}>{category.categoryName}</Link>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Input
          fluid
          icon="tags"
          iconPosition="left"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ width: '100%', paddingBottom: '10px' }}
        />
        <Button color="white" onClick={handleAddCategory}>Add Category</Button>
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
