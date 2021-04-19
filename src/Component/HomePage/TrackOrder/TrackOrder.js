import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form";

const TrackOrder = () => {
    const [trackData, setTrackData] = useState({})
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState({})


    const handleChange = (e) => {
        const data = { ...trackData }
        data[e.target.name] = e.target.value
        setTrackData(data)
    }


    const handleClick = () => {

        const id = trackData.id 
        console.log(id);
       
        if(id){
            fetch(`https://frozen-inlet-20228.herokuapp.com/OrderDetails/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0])
                setTrackData(data[0])

                if(data[0]._id){
                    setShow(!show)
                }
            })
            .catch(err => {
                console.log(err);
                 alert(`No order found . Or check your order id again`)
            })
        }
        else{
            setShow(false)
            alert('please input order id correctly again')
        }
    };
    console.log(trackData);
    return (
        <div className=" p-3 text-center w-100 d-flex justify-content-center " style={{ backgroundImage: 'linear-gradient(to right, rgb(173, 169, 150), rgb(242, 242, 242), rgb(219, 219, 219), rgb(234, 234, 234))' }}>
            <div className="w-75 ">
                <h1 className=''>Track your Parcel</h1>
                <div className="d-flex justify-content-center  p-5" >
                    <input onBlur={handleChange} name="id" type="text" className="form-control w-100 " placeholder='Track your order by Order ID' require/>
                    <button onClick={handleClick} className="btn btn-dark ms-2" type="submit" ><Search></Search> </button>

                </div>
                {
                    show && <div className="p-5 rounded " style={{ backgroundImage: 'linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240))' }}>
                        <h1>Hi , {trackData.name}</h1>
                        <h3>You placed this Order on {trackData.orderDate}</h3>
                        <h5> Your current order status is : <strong>{trackData.status}</strong></h5>
                        <p><small>I hope you never get this item 🙃🙃</small></p>
                    </div>
                }
            </div>
        </div>
    );
};

export default TrackOrder;