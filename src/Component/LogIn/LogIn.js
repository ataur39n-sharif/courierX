import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { Google } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const { register, handleSubmit} = useForm();

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const provider = new firebase.auth.GoogleAuthProvider();

    const authToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
            }).catch(function (error) {
                console.log(error);
            });

    }

    const handelSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                if (result.user.displayName) {
                    Swal.fire(
                        'success!',
                        'Successfully logged In',
                        'success'
                    )

                    const { displayName, email, photoURL } = result.user;
                    const userInfo = {
                        ...loggedInUser,
                        name: displayName,
                        email: email,
                        image: photoURL
                    };
                    setLoggedInUser(userInfo)
                    history.replace(from)
                    authToken()
                }

            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    'something went wrong, please try again later',
                    'error'
                )
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleClick = () => {
        (async () => {

            const { value: accept } = await Swal.fire({
                title: 'Terms and conditions',
                input: 'checkbox',
                inputValue: 1,
                inputPlaceholder:
                    'I agree with the terms and conditions',
                confirmButtonText:
                    'Continue&nbsp;<i  className="fa fa-arrow-right"></i>',
                inputValidator: (result) => {
                    return !result && 'You need to agree with T&C'
                }
            })

            if (accept) {
                handelSignIn()
            }
        })()
    }

    const onSubmit = data => {

        console.log(data);
        // firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;

        //         fetch(`https://fathomless-bayou-61663.herokuapp.com/userInfo?email=${user.email}`)
        //             .then((response) => response.json())
        //             .then(result => {
        //                 console.log(result);
        //                 setLoggedInUser(result[0])
        //                 Swal.fire( 'Success','successfully logged in ','success')
        //                 history.push('/')
        //             })
        //     })
        //     .catch((error) => {
        //         const errorMessage = error.message;
        //         // console.log(errorMessage);
        //         alert(errorMessage)
        //     });


    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className='p-5'>
                    <button className="btn btn-warning" onClick={handleClick}><Google></Google> sign in with Google </button>
                </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
                <form className="text-center w-25 mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="p-5">Login</h1>
                    <input className="form-control m-2" placeholder="Enter your email" type="email"{...register("email", { required: true })} />
                    <br />
                    <input className="form-control m-2" placeholder="Enter your password" type="password"{...register("password", { required: true })} />
                    <br />
                    <input className='btn btn-dark' type="submit" value="LogIn" />
                </form>
            </div>
        </>
    );
};

export default LogIn;