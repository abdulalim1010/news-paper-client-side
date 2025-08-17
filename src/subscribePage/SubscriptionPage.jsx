import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import subBanner from "../../src/assets/premium.jpg";
import UseAuth from "../hooks/UseAuth";
import NewsLogo from "../pages/home/newslogo/NewsLogo";

const PLANS = [
  { label: "1 Minute (Demo)", value: "1min", price: 1 },
  { label: "5 Days", value: "5days", price: 5 },
  { label: "10 Days", value: "10days", price: 9 },
];

const SubscriptionPage = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(PLANS[0]);

  const handleSubscribe = () => {
    navigate(`/payment?duration=${plan.value}&price=${plan.price}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <button
  onClick={() => navigate(-1)}
  className="m-7 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
<NewsLogo />
</button>
      {/* 💎 Banner */}
      <div
        className="h-64 bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${subBanner})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-lg z-10">
          Upgrade to Premium
        </h1>
      </div>

      {/* ⚙️ Plan Picker */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10 space-y-6 border border-yellow-400">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-1">
            Subscription Plans
          </h2>
          <p className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{user?.email}</span>
          </p>
        </div>

        <label className="block">
          <span className="font-medium text-gray-700">Choose Duration</span>
          <select
            className="select select-warning w-full mt-2"
            value={plan.value}
            onChange={(e) =>
              setPlan(PLANS.find((p) => p.value === e.target.value))
            }
          >
            {PLANS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} — ${p.price}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleSubscribe}
          className="btn btn-warning w-full font-bold tracking-wide"
        >
          Proceed to Payment (${plan.price})
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
