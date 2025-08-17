import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetails = () => {
  const { id } = useParams();
  console.log("🆔 Article ID:", id); 
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`https://y-ruby-three.vercel.app/article/${id}`)
  
      .then(res => setArticle(res.data))
      
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
      <p className="mb-4 text-gray-600">Author: {article.authorEmail}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetails;
