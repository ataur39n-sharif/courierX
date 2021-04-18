import React from 'react';
import headers from '../../../img/header.jpg'

const Header = () => {
    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-6 w-100">
                    this is demo
                </div>
                <div className="col-md-6">
            <img style={{ height:'200px'}} src={headers} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Header;