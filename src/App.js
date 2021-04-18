import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/HomePage/Home';
import Dashboard from './Component/Dashboard/Dashboard';
import LogIn from './Component/LogIn/LogIn';
import { createContext, useState } from 'react';
import CheckOut from './Component/serviceDetails/ServiceDetails';
import Shipment from './Component/Shipment/Shipment';
import Payment from './Component/Payment/Payment';
import PrivateRoute from './Component/LogIn/PrivateRoute/PrivateRoute';

export const userContext = createContext()
AOS.init();

function App() {
  const [loggedInUser, setLoggedInUser] = useState()

  const token = sessionStorage.getItem('token');

  if (!loggedInUser.email && token) {
    var decoded = jwt_decode(token);
    console.log(decoded);
    const info = { ...loggedInUser }
    info.name = decoded.name;
    info.email = decoded.email;
    info.image = decoded.picture;
    if (decoded.email) {
      setLoggedInUser(info)
    }
  }

  console.log(loggedInUser);
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/logIn">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/details/:id">
            <CheckOut></CheckOut>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <Payment></Payment>
          </PrivateRoute>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
