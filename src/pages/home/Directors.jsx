import React from "react";

const directors = [
  {
    name: "Abdul Karim",
    title: "Managing Director",
    image: "https://via.placeholder.com/300x300.png?text=Director+1",
    bio: "Over 20 years of leadership experience in the corporate world.",
  },
  {
    name: "Farida Yasmin",
    title: "Deputy Director",
    image: "https://via.placeholder.com/300x300.png?text=Director+2",
    bio: "Dedicated to innovation and building strong teams for success.",
  },
  {
    name: "Mahmud Rahman",
    title: "Finance Director",
    image: "https://via.placeholder.com/300x300.png?text=Director+3",
    bio: "Expert in financial planning and sustainable business growth.",
  },
];

const Directors = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Directors</h2>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {directors.map((director, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <img
                src={director.image}
                alt={director.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{director.name}</h3>
              <p className="text-blue-600">{director.title}</p>
              <p className="text-gray-600 mt-2 text-sm">{director.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;
