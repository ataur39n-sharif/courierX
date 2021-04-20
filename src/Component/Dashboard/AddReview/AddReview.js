import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../../App';

const Review = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const info = { ...loggedInUser}
        info.review= data


        console.log(info);

        fetch(`https://frozen-inlet-20228.herokuapp.com/addReview`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    };
    return (
        <div data-aos="fade-down" data-aos-duration="1500"  className="w-100 bg-light p-5 rounded mt-5 text-center">
            <h1 className='m-5'>Review out service</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <input value={loggedInUser.name} className="form-control" placeholder='name' {...register("name", { required: true })} readOnly />
                <br />
                <label htmlFor="">Rating Our Service out of 5</label>
                <select className="form-control text-center" name="rating" {...register("rating", { required: true })}>
                    <option >5</option>
                    <option >4</option>
                    <option >3</option>
                    <option >2</option>
                    <option >1</option>
                </select>
                <br />
                <textarea className="form-control" placeholder='tell us something about our service' {...register("review", { required: true })} />
                <br />
                <input className="btn btn-dark" type="submit" value='Submit' />
            </form>
        </div>
    );
};

export default Review;