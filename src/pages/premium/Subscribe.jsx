import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan || "Free Trial";
  const [duration, setDuration] = useState("1min");

  const handleSubscribe = () => {
    // 👇 Checkout এ পাঠিয়ে দাও, সাথে plan ও duration
    navigate("/checkout", {
      state: {
        plan,
        duration
      }
    });
  };

  return (
    <div className="p-6">
      
      
      <h2 className="text-2xl font-bold mb-4">Subscribe to {plan}</h2>

      <label className="block mb-2">Select Subscription Period:</label>
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border px-4 py-2 mb-4"
      >
        <option value="1min">1 Minute (Test)</option>
        <option value="5days">5 Days</option>
        <option value="10days">10 Days</option>
      </select>

      <button
        onClick={handleSubscribe}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Subscribe;
