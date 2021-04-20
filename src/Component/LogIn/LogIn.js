import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Swal from 'sweetalert2';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

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

    const logIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                const { displayName, email, photoURL } = result.user;
                const userInfo = {
                    name: displayName,
                    email: email,
                    image: photoURL
                };
                setLoggedInUser(userInfo)
                history.replace(from)
                authToken()
            }).catch((error) => {
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
                logIn()
            }
        })()
    }


    return (
        <div>
            <h3>this is log In page</h3>
            <button onClick={handleClick}>sign in </button>
        </div>
    );
};

export default LogIn;