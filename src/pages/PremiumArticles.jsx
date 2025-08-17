import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../hooks/UseAuth";



const PremiumArticles = () => {
  const { user } = UseAuth();
  const [articles, setArticles] = useState([]);
  const [isPremium, setIsPremium] = useState(false);


  // ✅ Check if user is premium
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://y-ruby-three.vercel.app/users?email=${user.email}`)
        .then((res) => {
          setIsPremium(res.data?.isPremium || false);
        })
        .catch((err) => console.error("Failed to check premium status", err));
    }
  }, [user]);

  // ✅ Get premium articles
  useEffect(() => {
    axios
      .get("https://y-ruby-three.vercel.app/premium-articles")
      .then((res) => setArticles(res.data))
      .catch((err) =>
        console.error("Error fetching premium articles", err)
      );
  }, []);

  return (
    <div className="p-4">
      
      <h2 className="text-6xl text-center items-center font-bold mb-6">💎 Premium Articles</h2>

      {articles.length === 0 ? (
        <p>No premium articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article._id}
              className="card bg-yellow-100 border border-yellow-400 p-4 shadow-md"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                📢 {article.publisher}
              </p>
              <p className="text-sm mb-4">
                {article.description?.slice(0, 100)}...
              </p>

              <button
                className={`btn ${
                  isPremium ? "btn-primary" : "btn-disabled"
                }`}
                onClick={() => {
                  if (isPremium) {
                    window.location.href = `/articles/${article._id}`;
                  }
                }}
              >
                {isPremium ? "Details" : "Premium Only"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
