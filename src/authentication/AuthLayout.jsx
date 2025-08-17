import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import logoimage from '../assets/login.jfif';
import NewsLogo from '../pages/home/newslogo/NewsLogo';

const AuthLayout = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-base-200 min-h-screen">
      {/* News Logo on top */}
      <div className="p-4 pl-10">

      <button
  onClick={() => navigate(-1)}
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
<NewsLogo />
</button>
        
      </div>

      {/* Main content: Image + Form */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center px-6 gap-10">
        {/* Left side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={logoimage}
            alt="Login"
            className="w-130 rounded-lg shadow-2xl"
          />
        </div>

        {/* Right side: Outlet (Form) */}
        <div className="w-full lg:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
