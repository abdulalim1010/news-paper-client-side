import React from "react";
import Slider from "react-slick";

const TrendingArticlesSlider = ({ articles }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,   
    slidesToScroll: 1,
    responsive: [      
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  
  const trendingArticles = articles
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);

  return (
    <div className="trending-articles my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Trending Articles</h2>
      <Slider {...settings}>
        {trendingArticles.map(article => (
          <div key={article.id} className="p-2">
            <div className="border rounded shadow hover:shadow-lg transition p-4 bg-white">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Views: {article.viewCount}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingArticlesSlider;
