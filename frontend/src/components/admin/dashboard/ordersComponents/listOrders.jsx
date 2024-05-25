'use client';
import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateOrder,deleteOrder} from '@/services/OrderServices';
const ListOrders = ({orders}) => {
const [orderData, setOrderData] = useState(orders)
const onChangeInput = (e, _id) => {
const { name, value } = e.target
const editData = orderData.map((item) =>
item._id === _id && name ? { ...item, [name]: value } : item
)
setOrderData(editData)
updateOrder(_id,value)
}
const statusColors = {
'Not processed': 'bg-pink-500',
Processing: 'bg-blue-500',
Shipped: 'bg-green-500',
Delivered: 'bg-lime-500',
Cancelled: 'bg-gray-500',
};
const handleDeleteOrder=async(_id)=>{
    if (!window.confirm('Are you sure to delete')) {
    return;
    }
    await deleteOrder(_id)
    .then(() => {
    console.log('successfully deleted!');
    setOrderData((prevOrders) => prevOrders.filter((order) => order._id !==_id));
    })
    .catch((error) => {
    console.log(error);
    });
    
    }
return (
<Table striped bordered hover>
<thead>
<tr>
<th>Action</th>
<th>Status</th>
<th>Date</th>
<th>Client</th>
<th>Total</th>
<th style={{ minWidth: '550px' }}>Products</th>
</tr>
</thead>
<tbody>
{orderData.map(({ _id,status, createdAt,client, total, lineOrder
},ind) => (
<tr key={ind}>
<td>
<span onClick={() => {
handleDeleteOrder(_id);
}}>
<DeleteIcon style={{ color: "red" }}/>
</span>
</td>
<td>
<select
name="status"
value={status}
type="text"
onChange={(e) => onChangeInput(e, _id)}
placeholder="Type status"
className={`badge ${statusColors[status] || 'bg-gray-400'}
text-white`}
>
<option value="Not processed">Not processed</option>
<option value="Processing">Processing</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>
<option value="Cancelled">Cancelled</option>
</select>
</td>
<td>
{new Date(createdAt).toLocaleDateString()}
</td>
<td>
{client}
</td>
<td>
{total}
</td>
<td style={{ display: 'flex', flexDirection: 'column' }}>
{lineOrder.map(value=>{
return <div>
<div>
<span style={{ display: 'flex', flexDirection: 'row' }}>
<img src ={value.articleID?.imageart} alt="" width="35"
height="35" />
{value.articleID?.designation}
</span>
</div>
<div>Quantity : {value.quantity}</div>
<div>Total Price : {value.totalPrice}</div>
</div>
})}
</td>
</tr>
))}
</tbody>
</Table>
)
}
export default ListOrders