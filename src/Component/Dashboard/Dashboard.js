import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddService from './AddService/AddService';
import Manage from './Manage/Manage';
import Orders from './Orders/Orders';
import ParselList from './ParselList/ParselList';
import Sidebar from './Sidebar/Sidebar';
import AddAdmin from './AddAdmin/AddAdmin';
import Review from './Review/Review';
import Default from './Default/Default';
import OrderDetails from './ParselList/OrderDetails';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
    return (
        <div  className="d-flex justify-content-center">
            <div className="row w-100">
                <div className="col-md-3 p-0">
                    <Sidebar></Sidebar>
                </div>
                <div className=" col-md-9 d-flex justify-content-center">
                   
                    <Switch>
                        <Route exact path={`${path}`}>
                            <Default></Default>
                        </Route>
                        <Route path={`${path}/addService`}>
                            <AddService></AddService>
                        </Route>
                        <Route path={`${path}/manage`}>
                            <Manage></Manage>
                        </Route>
                        <Route path={`${path}/parcels`}>
                            <ParselList></ParselList>
                        </Route>
                        <Route path={`${path}/orders`}>
                            <Orders></Orders>
                        </Route>
                        <Route path={`${path}/addAdmin`}>
                            <AddAdmin></AddAdmin>
                        </Route>
                        <Route path={`${path}/review`}>
                            <Review></Review>
                        </Route>
                        <Route path={`${path}/OrderDetails/:id`}>
                            <OrderDetails></OrderDetails>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;