import React from 'react';
import { ArrowLeftSquareFill, ArrowUpCircleFill, ArrowUpLeftCircleFill, ArrowUpSquareFill } from 'react-bootstrap-icons';
import { useContext } from 'react/cjs/react.development';
import { userContext } from '../../../App';

const Default = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    // const date = 
    return (

        <div data-aos="zoom-out-down" data-aos-duration="1500" className='w-100 p-5 text-center bg-light mt-5'>
            <h1>Welcome , <span className="text-warning">{loggedInUser.name}</span></h1>
            <h2>Today <span>{new Date().toDateString()}</span></h2>
            <h3> <span className=""><ArrowUpLeftCircleFill/></span> Let's tour Your Dashboard</h3>
        </div>

    );
};

export default Default;