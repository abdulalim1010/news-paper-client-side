import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPublisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const res = await axios.get("https://y-ruby-three.vercel.app/publishers");
        setPublishers(res.data);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) return <p>Loading publishers...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Publishers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishers.length === 0 && <p>No publishers found.</p>}

        {publishers.map((publisher) => (
          <div
            key={publisher._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={publisher.logo}
              alt={publisher.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{publisher.name}</h3>
            <p className="text-gray-600 text-center">{publisher.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublisher;
