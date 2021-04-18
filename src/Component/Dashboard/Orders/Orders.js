import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [orders , setOrders] = useState([])

    useEffect(() => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/usersOrder?email=${loggedInUser.email}`)
        .then((response) => response.json())
        .then(data =>{
            console.log(data);
            setOrders(data)
        })
    },[])

console.log(orders);

    return (
        <div data-aos="fade-down" data-aos-duration="1500" className="text-center rounded mt-4 bg-light w-100 p-3">
        <h1 className='m-5'>Your Order List</h1>
        { orders.length > 0 ?
            <table className="table table-success  table-hover  mt-5 ">
                <thead>
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Service name</th>
                        <th scope="col">order Date</th>
                        <th scope="col">Status</th>
                        
                    </tr>
                </thead>

                {
                    orders.map(order =>

                        < tbody key={order._id}>
                            <tr>
                                <th scope="row">{order._id}</th>
                                <td>{order.orderInfo.title}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.status}</td>
                                
                            </tr>
                        </tbody>
                    )
                }

            </table>
            :
            orders.length === 0 ? <p>No order Found</p> :
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                </div>
            </div>
        }
    </div >



    );
};

export default Orders;