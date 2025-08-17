import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TrendingDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://y-ruby-three.vercel.app/trendingArticles/${id}`)
      .then(res => {
        console.log("Fetched article:", res.data);
        setArticle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading article:", err);
        setLoading(false);
      });
  }, [id]);
  

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!article) return <p className="p-4 text-center text-red-500">Article not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={article.image} alt={article.title} className="w-full rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Publisher: {article.publisher} | Views: {article.views}
      </p>
      <p className="text-lg leading-relaxed">{article.description}</p>
      <button
  onClick={() => navigate(-1)}
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  ← Back
</button>

    </div>
  );
};

export default TrendingDetails;
