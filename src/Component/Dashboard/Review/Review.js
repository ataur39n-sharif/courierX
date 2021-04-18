import React from 'react';
import { useForm } from "react-hook-form";

const Review = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)

        fetch(`https://frozen-inlet-20228.herokuapp.com/addReview`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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
                <input className="form-control" placeholder='name' {...register("name", { required: true })} />
                <br />
                <label htmlFor="">Rating Our Service</label>
                <select className="form-control text-center" name="rating" {...register("rating", { required: true })}>
                    <option >⍟ ⍟ ⍟ ⍟ ⍟</option>
                    <option >⍟ ⍟ ⍟ ⍟ </option>
                    <option >⍟ ⍟ ⍟ </option>
                    <option >⍟ ⍟ </option>
                    <option >⍟</option>
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