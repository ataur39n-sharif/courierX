import React, { useContext } from 'react';
import jwt_decode from "jwt-decode";
import { Redirect, Route,} from 'react-router';
import { userContext } from '../../../App';

const PrivateRoute = ({children,...rest}) => {

 const [loggedInUser, setLoggedInUser] = useContext(userContext)

//  const token = sessionStorage.getItem('token');
//  var decoded = jwt_decode(token);
//  console.log(decoded);

// const setInfo = () => {
//   if(decoded.email){
//     setLoggedInUser(decoded)
//   }
// }

    return (
        <Route
        {...rest}
        render={({ location }) =>
          (loggedInUser.email ) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;