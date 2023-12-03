import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
import AddItem from './addItem';
import { REMOVE_ITEM } from '../utils/mutations';
import { 
    Icon, 
    Button,
    Label, 
    Table,
    TableHeader,
    TableRow, 
    TableBody, 
    TableCell, 
    TableHeaderCell } from 'semantic-ui-react'

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
            color: 'whitesmoke',
            fontSize: '18px'
        }}>
            
            <div style={{ display: 'flex' }}>
                <Link to="/home" className=''>
                    -- Back
                </Link>
            </div>

            <h4 style={{ margin: '1px', color: 'whitesmoke' }}>Category Name:</h4>

            <h2 style={{ color: 'darkcyan',fontSize: '50px', marginTop: '1px' }}>
                {category.categoryName} 
                <Icon name='list alternate outline' color='blue' />
            </h2>

            <p>Keep track of items in <span style={{ color:'yellow' }}>"{category.categoryName}"</span> by adding them with "Add Item"</p>

            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />

            <div className="ui container">
                <div style={{}}>
                    
                    <Button color='blue' style={{ marginTop: '10px', marginBottom: '20px' }} onClick={openModalAddItem}>Add Item</Button>
                </div>
                <div>
                {items.length > 0 ? (
                <Table color='teal' key={'teal'} celled inverted>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell colSpan='6'>
                                Items
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell className='center aligned'>
                                Name
                            </TableHeaderCell>
                            <TableHeaderCell className='center aligned'>
                                Quantity
                            </TableHeaderCell>
                            <TableHeaderCell className='right aligned'>
                                Price
                            </TableHeaderCell>
                            <TableHeaderCell style={{ width: '80px' }}>
                                Order
                            </TableHeaderCell>
                            <TableHeaderCell style={{ width: '80px' }}>
                                Receipt
                            </TableHeaderCell>
                               
                            <TableHeaderCell style={{ width: '80px' }}>
                                Delete?
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Label color='blue' style={{ fontSize:'18px' }} ribbon>
                                        {item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)}
                                    </Label>
                                </TableCell>
                                <TableCell className="center aligned">
                                    {item.quantity}
                                </TableCell>
                                <TableCell className="right aligned">
                                    <Icon link name='dollar sign' style={{color:'black'}} />
                                    {item.price}
                                </TableCell>

                               
                                <TableCell>
                                    <Icon link name='plus' style={{color:'green'}} />
                                </TableCell>
                                <TableCell>
                                    <Icon link name='minus' style={{color:'blue'}} />
                                </TableCell>

                                
                                
                                <TableCell className="center aligned">
                                    <Icon link name='delete' style={{color:'red'}} onClick={() => handleDelete(item._id)} />
                                        
                                        
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                ):(
                    <p style={{ color:'yellow' }}>--Add items with the Add Item button--</p>
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