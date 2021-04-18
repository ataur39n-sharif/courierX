import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SingleParsel from './SingleParsel';

const ParselList = () => {
    const [show, setShow] = useState(false)
    const [orders, setOrders] = useState([])

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
                            {
                                show && <th scope="col">Action</th>
                            }
                        </tr>
                    </thead>

                    {
                        orders.map(order => <SingleParsel loadData={loadData} order={order} show={show} setShow={setShow} key={order._id}></SingleParsel>

                            
                        )
                    }

                </table>
                :
                orders.length === 0 ? <p>NO Order found</p> :
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                    </div>
                </div>
            }
        </div >
    );
};

export default ParselList;