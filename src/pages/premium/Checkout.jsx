import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./payment/CheckoutForm";


// Load your Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const location = useLocation();
  const { plan, duration } = location.state || {};

  const priceMap = {
    "Free Trial": 0,
    "Duo Plan": 9.99,
    "Family Plan": 19.99,
  };

  const price = priceMap[plan] || 0;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Checkout for {plan}
      </h2>

      <p className="text-center text-gray-600 mb-4">
        Duration: {duration}, Amount: ${price}
      </p>

      {price > 0 ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} plan={plan} duration={duration} />
        </Elements>
      ) : (
        <p className="text-green-500 font-semibold text-center">
          No payment required for Free Trial
        </p>
      )}
    </div>
  );
};

export default Checkout;
