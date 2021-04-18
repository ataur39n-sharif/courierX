import React from 'react';
import bike from '../../../img/6447.jpg'

const Header = () => {
    return (
        <div className="row w-100 p-5">
            <div className="col-md-4 offset-md-2 d-flex align-items-center">
                <div>
                    <h1 style={{ fontWeight: 'bold' }}>Parcel Delivered On Time with no Hassle</h1>
                    <p><small>Easily track your courier, Get courier within hours. Efficient & safe delivery.</small></p>
                    <button className="btn btn-warning">Entry your parcel</button>
                </div>
            </div>
            <div className="col-md-6">
                <img className="img-fluid" src={bike} alt="" />
            </div>
        </div>
    );
};

export default Header;