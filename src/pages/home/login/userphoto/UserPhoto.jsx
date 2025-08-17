// src/pages/UserPhoto.jsx
import React from 'react';
import UseAuth from '../../../../hooks/UseAuth';


const UserPhoto = () => {
  const { user } = UseAuth()

  if (!user) return <p className="p-6 text-center text-red-500">Please login to view your profile.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <img
        src={user.photoURL || 'https://i.ibb.co/0jqHpnp/default-user.png'}
        alt="User Profile"
        className="w-40 h-40 rounded-full shadow-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{user.displayName || 'User'}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>

      {/* You can add more user info or editing options here */}
    </div>
  );
};

export default UserPhoto;
