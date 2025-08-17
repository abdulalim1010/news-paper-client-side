import React from "react";
import TrendingArticlesSlider from "./hompage/TrendingArticlesSlider";
import TrendingArticles from "./hompage/TrendingArticles";



const articles = [
  { id: 1, title: "React Basics", viewCount: 320, imageUrl: "/images/react1.jpg" },
  { id: 2, title: "Firebase Tutorial", viewCount: 280, imageUrl: "/images/firebase.jpg" },
  { id: 3, title: "Node.js Guide", viewCount: 500, imageUrl: "/images/node.jpg" },
  { id: 4, title: "Express Routing", viewCount: 150, imageUrl: "/images/express.jpg" },
  { id: 5, title: "MongoDB Crash Course", viewCount: 400, imageUrl: "/images/mongodb.jpg" },
  { id: 6, title: "Tailwind CSS Tips", viewCount: 360, imageUrl: "/images/tailwind.jpg" },
  { id: 7, title: "JavaScript ES6 Features", viewCount: 200, imageUrl: "/images/js.jpg" },
];

const HomePage = () => {
  return (
    <div>
      <TrendingArticlesSlider articles={articles} />
      {/* অন্য সেকশন গুলো */}
      <TrendingArticles></TrendingArticles>
    </div>
  );
};

export default HomePage;
