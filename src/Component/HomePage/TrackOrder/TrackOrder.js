import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const TrackOrder = () => {
    const [trackData, setTrackData] = useState({})
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState({})

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        console.log(data.id);
        // const id = parseInt(data.id)
        // // console.log( typeof(id),id);
        setShow(!show)

        // fetch(`http://localhost:5000/order/${id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         setTrackData(data)
        //     })
    };
    console.log(trackData);
    return (
        <div className=" p-5 text-center " style={{backgroundImage:'linear-gradient(to right, rgb(173, 169, 150), rgb(242, 242, 242), rgb(219, 219, 219), rgb(234, 234, 234))'}}>
            <h1 className='p-5'>Track your Parcel</h1>
            <form className="d-flex justify-content-center  p-5" onSubmit={handleSubmit(onSubmit)}>
                <input type="number" className="form-control w-25 " placeholder='Track your order by Order ID' {...register("id", { required: true })} />
                <input className="btn btn-dark ms-2" type="submit" value="Track Order" />
            </form>
            {
                show && <div  className="p-5 rounded " style={{backgroundImage : 'linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240))'}}>
                    <h1>This section is under construction</h1>
                </div>
            }
        </div>
    );
};

export default TrackOrder;