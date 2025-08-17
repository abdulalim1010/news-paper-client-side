import React from "react";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate("/subscribe", { state: { plan } });
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Free Trial */}
        <div className="border rounded-lg p-6 shadow bg-gray-100 text-center">
          <h3 className="text-xl font-bold mb-2">🎁 Free Trial</h3>
          <p className="text-3xl font-bold text-gray-700 mb-1">$0</p>
          <p className="mb-4 text-gray-600">7 days limited access</p>
          <ul className="text-left mb-6 space-y-2 text-sm">
            <li>✅ Read public articles</li>
            <li>✅ Submit articles (pending approval)</li>
            <li>🚫 No premium content</li>
            <li>🚫 No multi-device support</li>
          </ul>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => handleSubscribe("Free Trial")}
          >
            Start Free Trial
          </button>
        </div>

        {/* Duo Plan */}
        <div className="border rounded-lg p-6 shadow bg-yellow-100 text-center">
          <h3 className="text-xl font-bold mb-2 text-yellow-800">👥 Duo Plan</h3>
          <p className="text-3xl font-bold text-yellow-800 mb-1">$9.99<span className="text-sm">/mo</span></p>
          <p className="mb-4 text-gray-700">2 users — Full access</p>
          <ul className="text-left mb-6 space-y-2 text-sm">
            <li>✅ Full article access</li>
            <li>✅ Submit & edit articles</li>
            <li>✅ Premium content</li>
            <li>✅ 2-user login support</li>
          </ul>
          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            onClick={() => handleSubscribe("Duo Plan")}
          >
            Subscribe Duo
          </button>
        </div>

        {/* Family Plan */}
        <div className="border rounded-lg p-6 shadow bg-green-100 text-center">
          <h3 className="text-xl font-bold mb-2 text-green-800">👨‍👩‍👧‍👦 Family Plan</h3>
          <p className="text-3xl font-bold text-green-800 mb-1">$19.99<span className="text-sm">/mo</span></p>
          <p className="mb-4 text-gray-700">Up to 5 users</p>
          <ul className="text-left mb-6 space-y-2 text-sm">
            <li>✅ All Duo features</li>
            <li>✅ 5-user support</li>
            <li>✅ Parental control</li>
            <li>✅ Ad-free experience</li>
          </ul>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleSubscribe("Family Plan")}
          >
            Subscribe Family
          </button>
        </div>

      </div>
    </div>
  );
};

export default Plans;
