import React, { useEffect, useState } from 'react';
import { BagCheckFill, CardList, Gear, GearFill, List, PersonPlusFill, PlusCircleFill } from 'react-bootstrap-icons';
import { Link, useRouteMatch } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { userContext } from '../../../App';
import './Sidebar.css'

const Sidebar = () => {
    let { path, url } = useRouteMatch();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAdmin(data)
            })
    }, [])

    console.log(admin);

    return (
        <div >
            <div className="sidebar text-center">

                <h1>Dashboard</h1>

                {
                    admin && <div>
                        <Link to={`${url}/addService`}><PlusCircleFill/>  Add Service</Link>
                        <Link to={`${url}/manage`}><GearFill/> Manage </Link>
                        <Link to={`${url}/parcels`}><CardList/> Parcels List</Link>
                        <Link to={`${url}/addAdmin`}><PersonPlusFill/> Add Admin</Link>
                    </div>
                }
                <Link to={`${url}/orders`}><BagCheckFill/> Orders</Link>
                <Link to={`${url}/review`}> <span style={{fontSize:'20px'}}>★</span> Review </Link>
            </div>
        </div>
    );
};

export default Sidebar;