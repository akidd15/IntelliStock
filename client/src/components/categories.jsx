import { useState } from 'react';
import Receipt from './receipt';
import NewOrder from './newOrder';
import AddItem from './addItem';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CATEGORY } from '../utils/queries';
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
    // variables for controlling Receipt modal
    const [modalOpenReceipt, setModalOpenReceipt] = useState(false);
    // variables for controlling NewOrder modal
    const [modalOpenNewOrder, setModalOpenNewOrder] = useState(false);
    // variables for controlling AddItem modal
    const [modalOpenAddItem, setModalOpenAddItem] = useState(false);
    // Delete Item Mutation stored in removeItem
    const [removeItem] = useMutation(REMOVE_ITEM,{
        refetchQueries: [
            QUERY_SINGLE_CATEGORY
        ]
    });
    // grabs the categoryId from the route /:categoryId
    const { categoryId } = useParams();
    // this is how we have data to use in the table
    const { data } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId },
    });
    // possible variable being passed to NewOrder
    const [currentData, setCurrentData]=useState('');
    const [currentReceiptData, setCurrentReceiptData]=useState('');

    // check if there is data and if there is store it in category
    // category is necessary to grab information
    const category = data?.category || [];
    // store one level down in category to a variable called items
    const items = category.items || [];
    // receives 'itemId' and uses it to call removeItem which is a delete mutation
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
    // handles open modal for AddItem
    function openModalAddItem() {
        setModalOpenAddItem(true);
    }
    // handles close modal for AddItem
    function closeModalAddItem() {
        setModalOpenAddItem(false);
    }
    // sets modal to true which opens the modal
    // messing around with this one
    const openModalReceipt = async(value) => {
        setCurrentReceiptData(value)
        setModalOpenReceipt(true);
    }
    // sets to false which closes the modal
    function closeModalReceipt() {       
        setModalOpenReceipt(false);
    }
    // same but for NewOrder
    // messing with this one!!!!!
    const openModalNewOrder = async(order) => {
        // console.log(order);
        setCurrentData(order);
        setModalOpenNewOrder(true);
    }
    // setting modal to false
    function closeModalNewOrder() {
        setModalOpenNewOrder(false);
    }
    // This is what is shown to the user
    return (
        // place all content in a container and centered it on the page
        <div className='ui container' style={{
            marginTop: '50px',
            textAlign: 'center',
            height: '75%',
            // this sets the text for the entire page to default to 'whitesmoke'
            color: 'whitesmoke',
            // font size for entire page. unless otherwise stated
            fontSize: '18px'
        }}>
            {/* link to allow returing to '/home' */}
            <div style={{ display: 'flex' }}>
                <Link to="/home" className=''>
                    <Icon name='long arrow alternate left'/>
                    Back
                </Link>
            </div>
            {/* Information */}
            <h4 style={{ margin: '1px', color: 'whitesmoke' }}>Category Name:</h4>
            {/* Lets you know which category you are in */}
            <h2 style={{ color: 'darkcyan',fontSize: '50px', marginTop: '1px' }}>
                <Icon name='list alternate outline' color='blue' />
                {category.categoryName}                
            </h2>
            {/* further explains the purpose of app */}
            <p>Keep track of items in <span style={{ color:'yellow' }}>"{category.categoryName}"</span> by adding them with "Add Item"</p>
            {/* logic for AddItem modal */}
            <AddItem isOpen={modalOpenAddItem} onClose={closeModalAddItem} />
            
            <div className="ui container">
                {/* button for calling AddItem */}
                <div style={{}}>                    
                    <Button color='blue' style={{ marginTop: '10px', marginBottom: '20px' }} onClick={openModalAddItem}>Add Item</Button>
                </div>

                <div>
                {/* checks if there is items. if yes it returns the table */}
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
                                {/* name of item */}
                                <TableCell>
                                    <Label color='blue' style={{ fontSize:'18px' }} ribbon>
                                        {/* uppercases the first letter of every Item */}
                                        {item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)}
                                    </Label>
                                </TableCell>
                                {/* quantity of item */}
                                <TableCell className="center aligned">
                                    {item.quantity}
                                </TableCell>
                                {/* price, if supplied, of item */}
                                <TableCell className="right aligned">
                                    <Icon link name='dollar sign' style={{color:'black'}} />
                                    {item.price}
                                </TableCell>

                               {/* plus icon. will open NewOrder modal */}
                                <TableCell>
                                    <Icon link name='plus' style={{color:'green'}} onClick={() => openModalNewOrder(item)}/>
                                </TableCell>
                                {/* minus icon. will open Receipt modal */}
                                <TableCell>
                                    <Icon link name='minus' style={{color:'blue'}} onClick={() => openModalReceipt(item)}/>
                                </TableCell>
                                {/* will delete item when clicked */}
                                <TableCell className="center aligned">
                                    <Icon link name='delete' style={{color:'red'}} onClick={() => handleDelete(item._id)} />    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                ):(
                    // This is what will display if there aren't any items for the given category.
                    <p style={{ color:'yellow' }}>--Add items with the Add Item button--</p>
                )}
                </div>
            </div>

            {/* This div provides a buffer for footer. Do not remove */}
            <div style={{ height: '50px' }}></div>
            {/* NewOrder link */}
            <NewOrder
                isOpen={modalOpenNewOrder}
                onClose={closeModalNewOrder}
                // these variables allow NewOrder to compare current data to updated
                name={currentData.itemName}
                quantity={currentData.quantity}
                price={currentData.price}
                itemId={currentData._id}
            />
            {/* Receipt link */}
            <Receipt
                isOpen={modalOpenReceipt}
                onClose={closeModalReceipt}
                // current data variables
                currentName={currentReceiptData.itemName}
                currentQuantity={currentReceiptData.quantity}
                currentPrice={currentReceiptData.price}
                currentItemId={currentReceiptData._id}
            />
            
        </div>
    );
}