import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userContext } from '../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)

        Swal.fire({
            title: 'LogOut',
            text: "Are you sure?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.setItem('token', '')
                setLoggedInUser(' ')
                Swal.fire(
                    'Logged Out!',
                    'Successfully Logged Out',
                    'success'
                )
            }
        })
    }


    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>CourierX</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto me-5">
                        <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                        <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                        {
                            loggedInUser.email ? <button className="rounded-pill bg-warning" onClick={handleClick}><img className="rounded-circle" style={{ height: '30px' }} src={loggedInUser.image} alt="" /> {show && <span >{loggedInUser.name}</span>}</button> : <Link className="nav-link" to='/logIn'><button className="rounded-pill bg-warning">LogIn</button></Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;