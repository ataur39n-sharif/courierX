import React, { useEffect, useState } from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import './Review.css'


const Review = () => {

    const [reviews, setReviews] = useState()


    useEffect(() => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/review`)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setReviews(data)
            })
    }, [])

    console.log(reviews);




    return (
        <div className="text-center">
            <div className="row w-100">

                <h1 className="p-5 text-warning">What are Saying our Clients </h1>

                {
                    reviews?.length > 0 ?

                        reviews.map(review =>

                            <div key={review._id} className="col-md-4 col-sm-6 d-flex justify-content-center p-5 ">
                                <div className="card text-center p-2 bg-dark text-light custom-hover" style={{ width: '18rem' }}>
                                    <img style={{ width: '120px' }} className='rounded-circle m-auto review-img bg-dark' src={review.image} alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{review.name}</h5>
                                        <p className="card-text"><small>❝{review.review.review}❞</small></p>
                                        <p className="card-text"> <small>I recommend this company <strong>{review.review.rating}</strong> <StarFill /> out of 5</small></p>
                                    </div>
                                </div>
                            </div>

                        ) :
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Review;