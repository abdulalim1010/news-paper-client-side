import React from "react";
import { Lock } from "lucide-react"; // icon import

const features = [
  {
    title: "Live Layout & Page Builder",
    description:
      "Easily create everything! Newspaper Theme powers up your imagination to deliver audience-approved results: stunning visual content, stability, and performance.",
  },
  {
    title: "WordPress Template Builder",
    description:
      "Start building engaging WordPress websites today! Design pages, articles, author page, 404, and any template you need, right on the front-end with Drag & Drop Builder.",
  },
  {
    title: "Complete Header Builder",
    description:
      "Quickly create perfect headers for branding. Enjoy the flexibility of using perfect headers for different pages and devices. Take complete control over your headers!",
  },
  {
    title: "Flexible Footer Builder",
    description:
      "Take control of your website with Newspaper Theme. Import, create & customize multiple footers, and assign them to pages and templates. Yes! It’s that easy!",
  },
];

const NewspaperSection = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Build visually with <span className="text-blue-600">Newspaper Theme</span>
          </h2>
          <p className="text-blue-500 max-w-3xl mx-auto">
            Discover a spectacular page builder created for you. tagDiv Composer page builder gives you all the tools you need to create, design, and shape up your Blog, News, Magazine, eCommerce, and Business website in virtually no time!
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Discover Now
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className=" rounded-2xl shadow-md p-6 flex gap-4 hover:shadow-xl transition"
            >
              <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-700 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewspaperSection;
