import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const ParselList = () => {

    const [orders, setOrders] = useState([])

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

    const handelClick = (id) => {
        history.push(`/dashboard/OrderDetails/${id}`)
    }






    return (
        <div data-aos="fade-down" data-aos-duration="1500" className="text-center rounded mt-4 bg-light w-100 p-3">
            <h1 className='m-5'>All OrderEntry list</h1>
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
                                    <td>{order.status}</td>
                                    <td> <button onClick={() => handelClick(order._id)} className="btn btn-warning">view</button> </td>
                                </tr>
                            </tbody>

                        )
                    }

                </table>
                :
                    <div  className="d-flex justify-content-center">
                        <div  className="spinner-border" role="status">
                        </div>
                    </div>
            }
        </div >
    );
};

export default ParselList;