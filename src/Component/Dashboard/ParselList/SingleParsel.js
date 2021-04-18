import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SingleParsel = ({ order ,show , setShow}) => {

    
    const [update, setUpdate] = useState({})



    const handelChange = (e) => {
        console.log(e.target.name, e.target.value);
        const data = { ...update }
        data[e.target.name] = e.target.value
        setUpdate(data)
        setShow(true)

        Swal.fire(
            'Note!',
            'Though you changed the order status but still showing previous status . Once you Hit Update button then you can see the latest status.',
            'info'
        )

    }


    const handelClick = (id) => {
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(update)
                })
                    .then(response => response.json())
                    .then(data => {
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
        < tbody key={order._id}>
            <tr>
                <th scope="row">{order._id}</th>
                <td>{order.orderInfo.title}</td>
                <td>{order.name}</td>
                <td>
                    <select value={order.status} onChange={handelChange} className="form-control text-center" name="status">
                        <option >pending</option>
                        <option > shipped </option>
                        <option > done</option>
                    </select>
                </td>
                {
                    show && <td> <button onClick={() => handelClick(order._id)} className="btn btn-warning">Update</button> </td>
                }
            </tr>
        </tbody>
    );
};

export default SingleParsel;