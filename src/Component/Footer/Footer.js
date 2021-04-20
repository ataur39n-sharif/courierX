import React from 'react';
import { Facebook, Google, Twitter } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <div className="w-100 p-3 text-center pt-5 bg-light">
            <div className="for-bg">
                <div className="row">
                        <div className="col-md-3 mt-5 all-text">
                            <h6>Section 1</h6>
                            <h6>demo demo</h6>
                            <h6>demo demo demo demo demo</h6>
                            <h6> lorem lorem lorem</h6>
                            <h6>demo demo demo demo demo</h6>
                        </div>
                        <div className="col-md-3 mt-5 all-text">
                            <h6>Section 2</h6>
                            <h6>demo demo</h6>
                            <h6>demo demo demo demo demo</h6>
                            <h6> lorem lorem lorem</h6>
                            <h6>demo demo demo demo demo</h6>
                        </div>
                        <div className="col-md-3 mt-5 all-text">
                            <h6>Section 3</h6>
                            <h6>demo demo</h6>
                            <h6>demo demo demo demo demo</h6>
                            <h6> lorem lorem lorem</h6>
                            <h6>demo demo demo demo demo</h6>
                        </div>
                        
                        <div className="col-md-3 all-text">
                            <h4>Our Address</h4>
                            <h6>dhaka -2300</h6>
                            <h6>daine Plastic</h6>
                            <div className="social-icons">
                                <ul className="d-flex justify-content-center">
                                    <h6 className="p-2"><Facebook></Facebook></h6>
                                    <h6 className="p-2"><Google></Google></h6>
                                    <h6 className="p-2"><Twitter></Twitter></h6>
                                </ul>
                            </div>
                            <div className="call-now">
                                <h6 style={{ color: 'darkgrey' }}>Call Now</h6>
                                <button className="btn btn-color-home ">+83491124</button>
                            </div>
                        </div>

                    </div>
                    <p className="pt-5">Copyright {(new Date().getFullYear())} All Rights Reserved by <strong className="text-warning">Ataur Rahman</strong></p>
                </div>
        </div>
    );
};

export default Footer;