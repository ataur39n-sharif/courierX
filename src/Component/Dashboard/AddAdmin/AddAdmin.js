import React from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const AddAdmin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {

        Swal.fire({
            title: 'Are you sure?',
            text: "New admin can get full access .",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://frozen-inlet-20228.herokuapp.com/addAdmin`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data){
                        Swal.fire(
                            'Added!',
                            'Admin added successfully',
                            'success'
                          )
                    }
                    else{
                        Swal.fire(
                            'Error!',
                            'Something is wrong . Please try again later .',
                            'error'
                          )
                    }
                })
            }
          })


        // fetch(`https://frozen-inlet-20228.herokuapp.com/addAdmin`,{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })
    };
    return (
        <div data-aos="fade-down" data-aos-duration="1500"  className='w-100 p-5 text-center mt-3 bg-light'>
            <h1 className='m-5'>Add a new Admin</h1>
            <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-8">
                        <input className="form-control" placeholder="enter new admin email address" {...register("adminEmail", { required: true })} />
                    </div>
                    <div className="col-md-4">
                        <input className="btn btn-warning" type="submit" value="Add new Admin" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAdmin;