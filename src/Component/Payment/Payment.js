import React from 'react';
// import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';     
import { CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimplePay from './SimplePay';

const stripePromise = loadStripe(

    'pk_test_51IgoTXFUEygCHkUfvXWUpUvkqfoexhTacovN32mLbSufCqtK2gONhSLMtrNQd7l9dbbxfR93EUciLMPqlA83G7cm00fphJBQD3'
)

const Payment = () => {
    return (
      <div className='w-50'>
            <Elements stripe={stripePromise}>
           <SimplePay/>
        </Elements>
      </div>
    );
};

export default Payment;