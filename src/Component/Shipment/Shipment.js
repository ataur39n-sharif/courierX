import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';


const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    // console.log(loggedInUser);

    let history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const info = { ...loggedInUser }
        info.shipmentInfo = data
        setLoggedInUser(info)
        history.push('/payment')
    };


    return (
        <div className="w-100 d-flex justify-content-center">
            <div className='w-50 mt-5 text-center'>
                <h1 className='p-5'>Service Information</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='name' className='form-control' value={loggedInUser.name} {...register("name", { required: true })} readOnly />
                    <br />

                    <input placeholder='email' className='form-control' value={loggedInUser.email} {...register("email", { required: true })} readOnly />
                    <br />
                    <div className='row d-flex align-items-center m-2'>
                        <div className="col-md-6">
                            <label htmlFor="">select parcel pickUpDate</label>
                            <input placeholder='PickUpDate' className='form-control' type='date' {...register("pickUpDate", { required: true })} />
                            <br />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">parcel pickUp address</label>
                            <textarea className='form-control' type='text' {...register("pickUpAddress", { required: true })} />
                            <br />
                        </div>
                    </div>
                    <div className='row d-flex align-items-center m-2'>
                        <div className="col-md-6">
                            <label htmlFor="">select parcel dropDate</label>
                            <input placeholder='dropDate' className='form-control' type='date' {...register("dropDate", { required: true })} />
                            <br />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">parcel drop address</label>
                            <textarea className='form-control' type='text' {...register("dropAddress", { required: true })} />
                            <br />
                        </div>
                    </div>
                    <input className='btn btn-dark m-2' type="submit" value='Entry your Parcel' />
                </form>
            </div>
        </div>
    );
};

export default Shipment;