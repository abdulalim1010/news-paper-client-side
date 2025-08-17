import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import axios from 'axios';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    normalUsers: 0,
    premiumUsers: 0,
  });

  useEffect(() => {
    axios.get('https://y-ruby-three.vercel.app/user-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching user stats", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 text-center">
      <div className="bg-blue-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Total Users</h2>
        <CountUp end={stats.totalUsers} duration={2} className="text-4xl text-blue-800 font-bold" />
      </div>
      <div className="bg-green-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Normal Users</h2>
        <CountUp end={stats.normalUsers} duration={2} className="text-4xl text-green-800 font-bold" />
      </div>
      <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Premium Users</h2>
        <CountUp end={stats.premiumUsers} duration={2} className="text-4xl text-yellow-800 font-bold" />
      </div>
    </div>
  );
};

export default Statistics;
