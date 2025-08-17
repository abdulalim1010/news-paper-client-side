import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseAuth from '../../../hooks/UseAuth';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth()
  const location = useLocation();
  const navigate = useNavigate();

  const { plan, duration } = location.state || {};
  const [price, setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Set price based on plan
  useEffect(() => {
    if (plan === "Free Trial") setPrice(0);
    else if (plan === "Duo Plan") setPrice(9.99);
    else if (plan === "Family Plan") setPrice(19.99);
  }, [plan]);

  // Get client secret when price is set
  useEffect(() => {
    if (price > 0) {
      axios.post("https://y-ruby-three.vercel.app/create-payment-intent", { price })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setSuccess("✅ Payment Successful!");
      // 🔥 Update user in DB
      await axios.patch(`https://y-ruby-three.vercel.app/make-premium/${user.email}`, { duration });
      navigate("/dashboard"); // or navigate to any success page
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Pay for: {plan}</h2>
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="btn btn-primary mt-4 w-full"
        disabled={!stripe || !clientSecret}
      >
        Pay ${price}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
