import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRout = ({ children, requirePremium = false }) => {
  const { user, loading } = UseAuth(); 
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-center"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requirePremium && !user?.isPremium) {
    return <Navigate to="/upgrade" replace />; // redirect if not premium
  }

  return children;
};

export default PrivateRout;
