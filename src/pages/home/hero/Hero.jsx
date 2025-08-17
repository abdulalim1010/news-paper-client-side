import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const slides = [
  {
    title: "Breaking News: Market Hits New High",
    description: "The stock market reached unprecedented levels today...",
    bg: "https://via.placeholder.com/1200x600/1E40AF/FFFFFF?text=Market+News",
  },
  {
    title: "Sports Update: Local Team Wins Championship",
    description: "In an exciting finale, the hometown heroes claimed victory...",
    bg: "https://via.placeholder.com/1200x600/047857/FFFFFF?text=Sports+News",
  },
  {
    title: "Technology: AI Innovations Transforming Industry",
    description: "AI technology continues to evolve, reshaping how companies operate...",
    bg: "https://via.placeholder.com/1200x600/9D174D/FFFFFF?text=Tech+News",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      slideRef.current[current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [current]);

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={el => (slideRef.current[index] = el)}
          className={`absolute inset-0 w-full h-full bg-center bg-cover flex flex-col items-center justify-center text-center px-4 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            {slide.title}
          </h1>
          <p className="text-sm md:text-lg text-white drop-shadow-md">
            {slide.description}
          </p>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 flex gap-2 justify-center w-full">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;
