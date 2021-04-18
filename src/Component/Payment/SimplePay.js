import React, { useContext } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { userContext } from '../../App';

const SimplePay = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loggedInUser, setLoggedInUser] = useContext(userContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      
      console.log('[PaymentMethod]', paymentMethod);

      const info = {...loggedInUser}
      info.paymentInfo = paymentMethod
      info.status = 'pending'
      info.orderDate = new Date().toDateString()
      
      fetch(`https://frozen-inlet-20228.herokuapp.com/addOrder`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })

    }
  };

  return (
    <div className="text-center m-auto">
      <form onSubmit={handleSubmit}>
      <CardElement className='m-5' />
      <button className="btn btn-dark"type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    </div>
  );
};

export default SimplePay;