import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AllPublisher from "./AllPublisher";
import Statistics from "./hompage/Statistics";
import Plans from "../premium/Plans";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import AboutUs from "./AboutUs";
import Hero from "./hero/Hero";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const cardRefs = useRef([]); // for animation

  useEffect(() => {
    axios.get('https://y-ruby-three.vercel.app/trendingArticles')
      .then(res => {
        setArticles(res.data);
      })
      .catch(err => console.error("Error fetching articles:", err));
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, [articles]);

  return (
    <div>

      <Hero/>
      <AboutUs/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {(!articles || articles.length === 0) ? (
          <p className="text-center col-span-full">No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <div
              key={article._id}
              className="card bg-base-100 shadow-md"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <figure>
                <img
                  src={article.image || "https://via.placeholder.com/300x200"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{article.title}</h2>
                <p>{article.description?.slice(0, 100)}...</p>
                <div className="text-sm text-gray-500">
                  Views: {article.views} | Publisher: {article.publisher}
                </div>
                <div className="card-actions justify-end">
                  <Link to={`/trending/${article._id}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* You can animate these sections too later if needed */}
      <AllPublisher />
      <Statistics />
      <Plans />
    </div>
  );
};

export default Home;
