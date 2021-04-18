import React from 'react';
import ContactForm from './ContactForn/ContactForm';
import Header from './Header/Header';
import Review from './Review/Review';
import Services from './ServicesSection/Services';
import TrackOrder from './TrackOrder/TrackOrder';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <TrackOrder></TrackOrder>
            <Services></Services>
            <Review></Review>
            <ContactForm></ContactForm>

        </div>
    );
};

export default Home;