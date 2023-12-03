import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import AddItem from './addItem';
import { REMOVE_ITEM } from '../utils/mutations';
import { Icon, Label, Table, TableBody, TableCell, TableHeaderCell } from 'semantic-ui-react'

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
            });
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
        <div className='ui container' style={{
            marginTop: '75px',
            textAlign: 'center',
            height: '75%',
            color: 'whitesmoke'
        }}>
            
            <div style={{ display: 'flex' }}>
                <Link to="/home" className=''>
                    -- Back
                </Link>
            </div>

            <h4 style={{ margin: '1px', color: 'whitesmoke' }}>Category Name:</h4>

            <h2 style={{ fontSize: '50px', marginTop: '1px', color: 'whitesmoke' }}>{category.categoryName}</h2>

            <p>Keep track of items in <span>"{category.categoryName}"</span> by adding them below</p>

            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />

            <div className="ui container">
                <div style={{}}>
                    
                    <button style={{ marginTop: '10px', marginBottom: '20px' }} onClick={openModalAddItem}>Add Item</button>
                </div>
                <div>
                {items.length > 0 ? (
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                Items
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className='center aligned' rowSpan='2'>
                                Name
                            </Table.HeaderCell>
                            <TableHeaderCell>
                                +
                            </TableHeaderCell>
                            <Table.HeaderCell className='center aligned' rowSpan='2'>
                                Quantity
                            </Table.HeaderCell>
                            <TableHeaderCell>
                                -
                            </TableHeaderCell>
                            <Table.HeaderCell className='right aligned' rowSpan='2'>
                                Price
                            </Table.HeaderCell>
                            
                            <Table.HeaderCell style={{ width: '80px' }}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {items.map((item) => (
                            <Table.Row key={item._id}>
                                <Table.Cell>
                                    <Label ribbon>
                                        {item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)}
                                    </Label>
                                </Table.Cell>
                                
                                <TableCell>
                                    <button>+</button>
                                </TableCell>

                                <Table.Cell className="right aligned">
                                    {item.quantity}
                                </Table.Cell>
                                
                                <TableCell>
                                    <button>-</button>
                                </TableCell>

                                <Table.Cell className="right aligned">
                                    {item.price}
                                </Table.Cell>
                                
                                <Table.Cell className="center aligned">
                                    <Icon link name='delete' style={{color:'red'}} onClick={() => handleDelete(item._id)} />
                                        
                                        
                                    
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                ):(
                    <p style={{ color:'aliceblue' }}>--Add items with the Add Item button--</p>
                )}
                </div>
            </div>

            
            <div style={{ marginTop: '40px' }}>
            <p>Order allows you to add quantity to an existing item.</p>
            <button className='ui green button' onClick={openModalNewOrder}>Order</button>
            </div>
            
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <p>Receipt allows you to deduct quantity from an existing item.</p>
                <button className='ui red button' onClick={openModalReceipt}>Receipt</button>
            </div>

            <div style={{ height: '50px' }}></div>

            <NewOrder
                isOpen={modalOpenNewOrder}
                onClose={closeModalNewOrder}
                items={items}
            />

            <Receipt
                isOpen={modalOpenReceipt}
                onClose={closeModalReceipt}
                items={items}
            />
            
        </div>
    );
}