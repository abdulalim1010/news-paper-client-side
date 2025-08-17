import React, { useEffect, useState } from "react";
import axios from "axios";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("https://y-ruby-three.vercel.app/dashboard/articles");
      setArticles(res.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  const handleApprove = async (id) => {
    try {
      await axios.patch(`https://y-ruby-three.vercel.app/articles/approve/${id}`);
      alert("Article approved and published!");
      fetchArticles();
    } catch (error) {
      alert("Failed to approve article.");
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl mb-4">All Articles</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-3 py-1">Title</th>
            <th className="border px-3 py-1">Author Email</th>
            <th className="border px-3 py-1">Role</th>
            <th className="border px-3 py-1">Publisher</th>
            <th className="border px-3 py-1">Status</th>
            <th className="border px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td className="border px-3 py-1">{article.title}</td>
              <td className="border px-3 py-1">{article.authorEmail}</td>
              <td className="border px-3 py-1">{article.role || "user"}</td>
              <td className="border px-3 py-1">{article.publisher || "N/A"}</td>
              <td className="border px-3 py-1">{article.status}</td>
              <td className="border px-3 py-1">
                {/* Example: Publish button for admin */}
                {article.status !== "approved" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(article._id)}
                  >
                    Publish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllArticles;
