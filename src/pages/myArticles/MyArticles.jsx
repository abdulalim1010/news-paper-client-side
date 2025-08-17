import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UseAuth from "../../hooks/UseAuth";

const MyArticles = () => {
  const { user } = UseAuth();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current user's articles
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    axios
      .get(`https://y-ruby-three.vercel.app/articles?email=${user.email}`)
      .then((res) => setArticles(res.data))
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await axios.delete(`https://y-ruby-three.vercel.app/articles/${id}`);
      setArticles((prev) => prev.filter((article) => article._id !== id));
    } catch (error) {
      alert("Failed to delete article. Please try again.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Articles</h2>

      {loading && (
        <div className="text-center py-10 text-lg font-semibold">Loading articles...</div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p>No articles found.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>isPremium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id}>
                <td>{idx + 1}</td>
                <td>{article.title}</td>

                <td>
                  {article.status === "approved" && (
                    <span className="text-green-600 font-semibold">Approved</span>
                  )}
                  {article.status === "declined" && (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      Declined
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => setDeclineReason(article.declineReason)}
                      >
                        See Reason
                      </button>
                    </div>
                  )}
                  {article.status === "pending" && (
                    <span className="text-yellow-500 font-semibold">Pending</span>
                  )}
                </td>

                <td>{article.isPremium ? "Yes" : "No"}</td>

                <td className="flex gap-2">
                  <Link to={`/articles/${article._id}`}>
                    <button className="btn btn-sm btn-info">Details</button>
                  </Link>
                  <Link to={`/update-article/${article._id}`}>
                    <button className="btn btn-sm btn-warning">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Decline Reason Modal */}
      {declineReason && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Decline Reason</h3>
            <p>{declineReason}</p>
            <button className="btn mt-4" onClick={() => setDeclineReason(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
