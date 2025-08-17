import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './comonents/router/Router.jsx'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './contexts/AuthProvider.jsx'
import { RoleProvider } from './dashboard/RoleProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RoleProvider>
      <RouterProvider router={router} /> 
     </RoleProvider>
  </AuthProvider>
  </StrictMode>,
)

  