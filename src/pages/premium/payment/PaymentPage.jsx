import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe("your_publishable_key_here");

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={9.99} />
    </Elements>
  );
};
