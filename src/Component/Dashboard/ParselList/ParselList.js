import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const ParselList = () => {

    const [orders, setOrders] = useState([])
    const [show, setShow] = useState(false)


    let history = useHistory()


    const loadData = () => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/orders`)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setOrders(data)
            })
    }

    useEffect(() => {

        loadData()

    }, [])


    console.log(orders);

    const handelNext = (id) => {
        history.push(`/dashboard/OrderDetails/${id}`)
    }

    const handelClick = (id) => {

        const status = document.getElementById(`status-${id}`).value

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
                    body: JSON.stringify({ status: status })
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
            <h1 className='m-5'>All OrderEntry list</h1>
            {/* <button onClick={handleReset}>reset</button> */}
            { orders.length > 0 ?
                <table className="table table-success  table-hover  mt-5 ">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Service name</th>
                            <th scope="col">order by</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    {
                        orders.map(order =>
                            < tbody key={order._id}>
                                <tr>
                                    <th scope="row">{order._id}</th>
                                    <td>{order.orderInfo?.title}</td>
                                    <td>{order.name}</td>
                                    <td className='d-flex justify-content-center'>
                                        <select id={`status-${order._id}`} value={order.status} onChange={() => handelClick(order._id)} className="form-control w-50 bg-dark text-light" name="status">
                                            <option value='pending' className='text-warning text-center' >pending</option>
                                            <option value='shipped' className='text-info text-center' > shipped </option>
                                            <option value='done' className='text-success text-center'> done</option>
                                        </select>
                                    </td>
                                    <td> <button onClick={() => handelNext(order._id)} className="btn btn-warning">view</button> </td>
                                </tr>
                            </tbody>

                        )
                    }

                </table>
                : orders.length === 0 ?
                    <div>
                        <h6>No order found </h6>
                    </div> :
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
            }
        </div >
    );
};

export default ParselList;