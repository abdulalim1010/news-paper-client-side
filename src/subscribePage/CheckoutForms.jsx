import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForms = ({ clientSecret, duration, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth()
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (error) {
      alert(error.message);
      setSubmitting(false);
      return;
    }

    // ✅ Payment successful → update backend
    await axios.patch(
      `https://y-ruby-three.vercel.app/make-premium/${user.email}`,
      { duration }
    );

    alert("Subscription activated!");
    navigate("/premium-articles");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        disabled={!stripe || submitting}
        className="btn btn-primary w-full"
      >
        {submitting ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const [search] = useSearchParams();
  const duration = search.get("duration");
  const price = Number(search.get("price") || 0);
  const [clientSecret, setClientSecret] = useState("");

  // Create payment intent
  useEffect(() => {
    if (!price) return;
    axios
      .post("https://y-ruby-three.vercel.app/create-payment-intent", { price })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error(err));
  }, [price]);

  if (!clientSecret) return <p className="p-6">Preparing payment...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForms clientSecret={clientSecret} duration={duration} price={price} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
