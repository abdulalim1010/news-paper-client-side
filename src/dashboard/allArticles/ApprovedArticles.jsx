import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";

const ApprovedArticles = () => {
  const { user } = UseAuth();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishers, setPublishers] = useState([]);

  // Load publishers
  useEffect(() => {
    axios.get("https://y-ruby-three.vercel.app/publishers")
      .then(res => setPublishers(res.data))
      .catch(err => console.error("Error loading publishers:", err));
  }, []);

  // Fetch articles based on filters
  const fetchArticles = () => {
    axios.get(`https://y-ruby-three.vercel.app/all-articles`, {
      params: { search, publisher }
    })
      .then(res => setArticles(res.data))
      .catch(err => console.error("Error fetching articles", err));
  };

  useEffect(() => {
    fetchArticles();
  }, [search, publisher]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📰 Approved Articles</h2>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All Publishers</option>
          {publishers.map(pub => (
            <option key={pub._id} value={pub.name}>{pub.name}</option>
          ))}
        </select>
      </div>

      {/* 📰 Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <div
            key={article._id}
            className={`card shadow-lg p-4 ${
              article.isPremium ? "bg-yellow-100 border-yellow-400 border" : "bg-white"
            }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-1">📢 {article.publisher}</p>
            <p className="text-sm mb-4">{article.description?.slice(0, 100)}...</p>

            <button
              className="btn btn-primary"
              disabled={article.isPremium && !user?.isPremium}
              onClick={() => window.location.href = `/articles/${article._id}`}
            >
              {article.isPremium && !user?.isPremium ? "Premium 🔒" : "Details"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedArticles;
