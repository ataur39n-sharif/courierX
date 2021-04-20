import React from 'react';
import Footer from '../Footer/Footer';
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
            <Footer></Footer>

        </div>
    );
};

export default Home;