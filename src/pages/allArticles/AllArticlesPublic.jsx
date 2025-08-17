import React, { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";
import { Link } from "react-router-dom";

const AllArticlesPublic = () => {
  const { user } = UseAuth();
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ search: "", publisher: "", tag: "" });

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      const params = new URLSearchParams(filters);
      const res = await axios.get(`https://y-ruby-three.vercel.app/all-articles?${params}`);
      setArticles(res.data);
    };
    fetchArticles();
  }, [filters]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>

      {/* Filter + Search */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="select select-bordered"
          onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
        >
          <option value="">All Publishers</option>
          <option value="Prothom Alo">Prothom Alo</option>
          <option value="BBC">BBC</option>
          {/* Add more */}
        </select>
        <select
          className="select select-bordered"
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
        >
          <option value="">All Tags</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
        </select>
      </div>

      {/* Article Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isPremium = article.isPremium;
          const isSubscribed = user?.role === "premium"; // or check any logic you set
          const showDetails = !isPremium || (isPremium && isSubscribed);

          return (
            <div
              key={article._id}
              className={`card shadow-md p-4 border ${
                isPremium ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
              }`}
            >
              <img src={article.image} className="w-full h-40 object-cover mb-2" alt="" />
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Publisher: {article.publisher}</p>
              <p className="text-sm text-gray-600 mb-2">{article.description?.slice(0, 100)}...</p>

              {showDetails ? (
                <Link to={`/articles/${article._id}`}>
                  <button className="btn btn-info btn-sm">Details</button>
                </Link>
              ) : (
                <button className="btn btn-disabled btn-sm">Subscribe to View</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticlesPublic;
