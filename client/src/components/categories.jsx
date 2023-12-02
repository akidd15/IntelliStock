import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import AddItem from './addItem';
import { REMOVE_ITEM } from '../utils/mutations';

export default function Categories() {
    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);
    const [modalOpenAddItem, setModalOpenAddItem] = useState(false);
    const [removeItem] = useMutation(REMOVE_ITEM,{
        refetchQueries: [
            QUERY_SINGLE_CATEGORY
        ]
    });

    const { categoryId } = useParams();

    const { data } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId },
    });
    const category = data?.category || [];
    const items = category.items || [];

    const handleDelete = async (itemId) => {
        
        try {
            await removeItem({
                variables: {
                    itemId: itemId
                }
            })
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    function openModalAddItem() {
        setModalOpenAddItem(true);
    }

    function closeModalAddItem() {
        setModalOpenAddItem(false);
    }

    function openModalReceipt() {
        setModalOpenReceipt(true);
    }

    function closeModalReceipt() {
        setModalOpenReceipt(false);
    }

    function openModalNewOrder() {
        setModalOpenNewOrder(true);
    }

    function closeModalNewOrder() {
        setModalOpenNewOrder(false);
    }

    return (
        <div className='ui container' style={{ marginTop: '75px',
        textAlign: 'center',
        height: '75%'
        }}>
            
            <div style={{ display:'flex' }}>
                <Link to="/home" className=''>
                    -- Back
                </Link>
            </div>

            <h4 style={{margin:'1px'}}>Category Name:</h4>
            
            <h2 style={{ fontSize: '50px', marginTop:'1px' }}>{category.categoryName}</h2>

            

            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />

            <div className="ui container">
                <div style={{}}>
                    
                    <button style={{ marginTop: '10px', marginBottom:'20px' }} onClick={openModalAddItem}>Add Item</button>
                </div>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th style={{ width: '80px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.itemName}</td>
                            <td className="right aligned">{item.quantity}</td>
                            <td className="right aligned">{item.price}</td>
                            <td className="center aligned">
                                <button className="ui red button" onClick={() => handleDelete(item._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            <div style={{ marginTop: '40px' }}>
            <button className='ui green button' onClick={openModalNewOrder}>New Order</button>
            </div>

            <NewOrder
                isOpen={modalOpenNewOrder}
                onClose={closeModalNewOrder}
                items={items}
            />

            <div style={{ marginTop: '20px', marginBottom:'20px' }}>
            <button className='ui red button' onClick={openModalReceipt}>Receipt</button>
            </div>
            <div style={{height:'50px'}}></div>

            <Receipt
                isOpen={modalOpenReceipt}
                onClose={closeModalReceipt}
                items={items}
            />
            
        </div>
    );
}