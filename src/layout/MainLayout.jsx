import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../comonents/navbar/NavBar';
import Footer from '../comonents/footer/Footer';

const MainLayout = () => {
  return (
    <div>

      <div><NavBar/></div>
      <div className='min-h-screen bg-green-800'>

        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;