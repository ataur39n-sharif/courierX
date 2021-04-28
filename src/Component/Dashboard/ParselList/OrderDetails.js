import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

const OrderDetails = () => {
    const {id} = useParams()
    const [show, setShow] = useState(false)
    const [ order , setOrder] = useState({})

    const loadData = () => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/OrderDetails/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            setOrder(data[0])
        })
    }

    useEffect(() => {
      loadData()
    },[])



    const handelClick = (id) => {

        const status = document.getElementById('status').value

        Swal.fire({
            title: 'Are you sure?',
            text: "Change order status",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://frozen-inlet-20228.herokuapp.com/update/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({status:status})
                })
                    .then(response => response.json())
                    .then(data => {
                        loadData()
                        console.log(data);
                        setShow(false)

                        Swal.fire(
                            'Updated!',
                            'Order Status updated',
                            'success'
                        )
                    })
            }
        })
    }


    return (
        <div data-aos="fade-down" data-aos-duration="1500" className="text-center rounded mt-4 bg-light w-100 p-3">
        <h1 className='m-5'>Order Details</h1>
        { order._id ?
            <table className="table table-success  table-hover  mt-5 ">
                <thead>
                    <tr>
                        <th scope="col">Service name</th>
                        <th scope="col">order date</th>
                        <th scope="col">order status</th>

                    </tr>
                </thead>

                < tbody key={order._id}>
                            <tr>
                                <th scope="row">{order.orderInfo.title}</th>
                                <td>{order.orderDate}</td>
                                <td className='d-flex justify-content-center'>
                                <select id="status"  value={order.status} onChange={()=>handelClick(order._id)} className="form-control w-50 bg-dark text-light" name="status">
                                            <option value='pending' className='text-warning text-center' >pending</option>
                                            <option value='shipped' className='text-info text-center' > shipped </option>
                                            <option value='done'  className='text-success text-center'> done</option>
                                        </select>
                                </td>
                            </tr>
                        </tbody>
                    
                

            </table>
            :
            (

                <div  className="d-flex justify-content-center">
                    <div  className="spinner-border" role="status">
                    </div>
                </div>
                )
        }
    </div >
    );
};

export default OrderDetails;