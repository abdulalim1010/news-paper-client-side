import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  
  useEffect(() => {
    axios.get(`https://y-ruby-three.vercel.app/article/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;

    try {
      const res = await axios.put(`https://y-ruby-three.vercel.app/articles/${id}`, {
        title,
        content
      });

      if (res.data.modifiedCount > 0) {
        alert("✅ Article updated!");
        navigate("/dashboard/myarticles");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (!article) return <p className="p-4">Loading article...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Update Article</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          defaultValue={article.title}
          name="title"
          className="w-full border p-2"
          placeholder="Title"
          required
        />
        <textarea
          defaultValue={article.content}
          name="content"
          rows="6"
          className="w-full border p-2"
          placeholder="Content"
          required
        ></textarea>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateArticle;
