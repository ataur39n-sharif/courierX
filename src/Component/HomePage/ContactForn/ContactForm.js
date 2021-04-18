import React from 'react';
import { useForm } from "react-hook-form";

const ContactForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='w-100 text-center bg-dark d-flex justify-content-center'>
            <form className=' w-75 p-5' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='p-5 text-warning'>Contact form</h1>
                <div className='row '>
                    <div className="col-md-6">
                        <input placeholder='enter your name' className='form-control m-2' {...register("name", { required: true })} />
                        <input placeholder='enter your email ' className='form-control m-2' {...register("email", { required: true })} />
                        <input placeholder=' subject' className='form-control m-2' {...register("subject", { required: true })} />
                    </div>
                    <div className="col-md-6">
                        <textarea placeholder='describe what you want to know' style={{ height: '130px' }} className='form-control m-2' {...register("details", { required: true })} />
                    </div>

                </div>
                <input className='btn btn-warning m-3' type="submit" />
            </form>
        </div>
    );
};

export default ContactForm;