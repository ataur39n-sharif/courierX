import axios from 'axios';
import Swal from 'sweetalert2'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {

    const [img, setImg] = useState(null)
    const [details, setDetails] = useState({
        title: '',
        description: '',
        cost: '',
        image: null,
    })

    const handleChange =(event) => {
        const updateDetails = {...details}
        updateDetails[event.target.name] = event.target.value 
        setDetails(updateDetails)
    }

    // const handleImageChange = (event) =>{
    //     const image = event.target.files[0]
    //     setImg(image)
    // }
    const handleImageChange = (event) => {
        const imgData = new FormData();
        imgData.set('key', '776db192c6ccbf902896240b8bf6f0d9');
        imgData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                const imgData = { ...details }
                imgData.image =  response.data.data.display_url
                
               setDetails(imgData)
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    // const onSubmit = data => {

    //      setDetails(data)
    //     const serviceInfo = {...data}
    //     serviceInfo.image = img

     

    //   if(details.img !== '') {
        
    //   }
    // };

    const handleSubmit = (e) => {
        e.preventDefault()
       if(details.image !== null) {
        fetch(`https://frozen-inlet-20228.herokuapp.com/addService`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details)
        })
            .then(response => {
                console.log(response.ok);
                if(response.ok) {
                    // alert('added successfully')
                    Swal.fire(
                        'Success',
                        'New service added to database successfully',
                        'success'
                      )
                }
            })
       }else {
        Swal.fire(
            'ERRor',
            'Waiting fo data . ',
            'error'
          )
       }
    }



    return (
        <div data-aos="fade-down" data-aos-duration="1500" className='w-100 text-center rounded mt-5 bg-light  mt-5 mb-5 p-5' >
            <h1>Add a new service</h1>
            <form className="mt-5">
                <input type="text" className="form-control" placeholder='service title' name='title' onBlur={handleChange} />
                <br />
                <textarea type="textArea" className="form-control" placeholder=' service description' name='description' onBlur={handleChange}/>
                <br />
                <input type="number" className="form-control" placeholder='service cost' name='cost' onBlur={handleChange}/>
                <br />
                <label htmlFor="img">Upload a Image</label>
                <input onChange={handleImageChange} type='file' className="form-control" name="img" />
                <br />
                <input onClick={handleSubmit} className='mt-5 btn btn-dark' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddService;