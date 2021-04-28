import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { useHistory, useParams } from 'react-router';
import { userContext } from '../../App';

const CheckOut = () => {
    const { id } = useParams()
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [checkout, setCheckout] = useState()

    let history = useHistory()

    useEffect(() => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/serviceList/${id}`)
            .then(response => response.json())
            .then(data => {
                setCheckout(data[0])
            })
    }, [])

    const handleClick = () => {
        console.log('clicked');
        const newInfo = { ...loggedInUser }
        newInfo.orderInfo = checkout
        setLoggedInUser(newInfo)
        history.push('/shipment')
    }

    console.log(checkout);
    return (
        <div data-aos="fade-down" data-aos-duration="1500" className='w-100 p-5 text-center mt-3 '>
            {
                checkout?._id ?
                    <div className="bg-light rounded p-5">
                        <h1 className="p-4" style={{ fontWeight: 'bold' }}>Service Name : {checkout.title}</h1>
                        <img style={{ height:'200px'}}className="rounded" src={checkout.image} alt="" />
                        <div className='bg-warning p-5 m-5'>
                            <h3>Service Description <ArrowRight /></h3>
                            <p>{checkout?.description}</p>
                        </div>
                        <h1 className="p-5">Service Cost : Only $ {checkout.cost}</h1>
                        <button className='btn btn-warning' onClick={handleClick}>Take this service</button>
                    </div>
                    : <div  className="d-flex justify-content-center">
                        <div  className="spinner-border" role="status">
                        </div>
                    </div>
            }
        </div>

    );
};

export default CheckOut;