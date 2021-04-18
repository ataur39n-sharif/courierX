import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Manage = () => {
    const [services, setServices] = useState([])
    
const loadData = () => {
    fetch(`https://frozen-inlet-20228.herokuapp.com/serviceList`)
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        setServices(data)
        
    })
}

    useEffect(() => {
        loadData()
    }, [])

    const handleClick = id => {

        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this data",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://frozen-inlet-20228.herokuapp.com/delete/${id}`, {
                    method: 'DELETE'
                })
                    .then((response) => response.json())
                    .then(data => {
                        loadData()
                        console.log(data);
                        if (data) {
                            Swal.fire(
                                'Deleted!',
                                'Your data has been deleted successfully.',
                                'success'
                            )
                        } else {
                            Swal.fire(
                                'Error!',
                                'Something is wrong . Please try again later.',
                                'error'
                            )
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        })

    }


    return (
        // <div>
        //     {
        //         services.map(service =>
        //             <li key={service._id}>
        //                 name: {service.title} cost: {service.cost}
        //                 <button onClick={() => handleClick(service._id)}>delete</button>
        //             </li>)
        //     }
        // </div>
        <div data-aos="fade-down" data-aos-duration="1500" className="text-center rounded mt-4 bg-light w-100 p-3">
            <h1 className='m-5'>Your Order List</h1>
            { services.length > 0 ?
                <table className="table table-success  table-hover  mt-5 ">
                    <thead>
                        <tr>
                            <th scope="col">Service Id</th>
                            <th scope="col">Service title</th>
                            <th scope="col">Service Charge</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>

                    {
                        services.map(service =>

                            < tbody key={service._id}>
                                <tr>
                                    <th scope="row">{service._id}</th>
                                    <td>{service.title}</td>
                                    <td>{service.cost}</td>
                                    <td><button onClick={() => handleClick(service._id)} className='btn btn-warning'>Delete</button></td>
                                </tr>
                            </tbody>
                        )
                    }

                </table>
                :
                (

                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                        </div>
                    </div>
                    )
            }
        </div >
    );
};

export default Manage;