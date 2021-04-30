import React, { useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { userContext } from '../../App';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const SimplePay = () => {
  const stripe = useStripe();
  const elements = useElements();

  let history = useHistory()

  const [loggedInUser, setLoggedInUser] = useContext(userContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    Swal.showLoading()

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {

      console.log('[PaymentMethod]', paymentMethod);

      const info = { ...loggedInUser }
      info.paymentInfo = paymentMethod
      info.status = 'pending'
      info.orderDate = new Date().toDateString()

      fetch(`https://frozen-inlet-20228.herokuapp.com/addOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(info)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          if (data) {
            history.push('/home')
            Swal.fire(
              'Success!',
              'Order Placed successfully . Check your Order status on Dashboard .',
              'success'
            )
          }else{
            Swal.fire(
              'Error!',
              'Please try again with correct information',
              'error'
          )
          }
        })

    }
  };

  return (
    <div className="text-center w-50 m-auto">
      <h1 className='p-5'>To process Order Make payment</h1>
      <form onSubmit={handleSubmit}>
        <CardElement className='m-5' />
        <button className="btn btn-dark" type="submit" disabled={!stripe}>
          Pay
      </button>
      </form>
    </div>
  );
};

export default SimplePay;