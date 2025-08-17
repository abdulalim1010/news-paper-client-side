import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Home from "../../pages/home/Home";
import AuthLayout from "../../authentication/AuthLayout";
import Login from "../../pages/home/login/Login";
import Register from "../../authentication/register/Register";
import Dashboard from "../../dashboard/Dashboard";
import AllUsers from "../../dashboard/allUsers/AllUsers";
import AllArticles from "../../dashboard/allArticles/AllArticles";
import AddPublisher from "../../dashboard/adPublisher/AddPublisher";
import MyArticles from "../../pages/myArticles/MyArticles";
import ArticleDetails from "../../pages/myArticles/ArticleDetails";
import UpdateArticle from "../../pages/myArticles/UpdateArticle";

import Plans from "../../pages/premium/Plans";
import PrivateRoute from "../../routes/PrivateRout";
import Subscribe from "../../pages/premium/Subscribe";
import Checkout from "../../pages/premium/Checkout";
import StripeProvider from "../../pages/StripeProvider";
import CheckoutForm from "../../pages/premium/payment/CheckoutForm";
import PremiumArticles from "../../pages/PremiumArticles";
import AdminRoute from "../../dashboard/admin/AdminRoute";
import AddArticle from "../../pages/addarticles/AddArticle";
import AllPublisher from "../../pages/home/AllPublisher";
import ApprovedArticles from "../../dashboard/allArticles/ApprovedArticles";
import PrivateRout from "../../routes/PrivateRout";
import SubscriptionPage from "../../subscribePage/SubscriptionPage";
import PaymentPage from "../../subscribePage/CheckoutForms";
import TrendingDetails from "../../pages/home/TrendingDetails";
import NotFound from "../../authentication/NotFound";
import UserPhoto from "../../pages/home/login/userphoto/UserPhoto";
import DashboardHome from "../../dashboard/DashboardHome";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "myarticles", element: <PrivateRoute><MyArticles /></PrivateRoute> },
      { path: "articles/:id", element: <PrivateRoute><ArticleDetails /></PrivateRoute> },
      { path: "update-article/:id", element: <PrivateRoute><UpdateArticle /></PrivateRoute> },
      {
        path: "/user-photo",
        element:<PrivateRoute><UserPhoto/></PrivateRoute>
      },
      {
        path: "all-articles",
        Component: ApprovedArticles
      },
      {
        path: "trending/:id",          
        element: <TrendingDetails />   
      },
      {
        path: '*',
        element:<NotFound/>
      },
      {
        path: "add-article",
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        )
      },

      {
        path: "plans",
        element: (
          <PrivateRoute>
            <Plans />
          </PrivateRoute>
        )
      },

      {
        path: "subscribe",
        element: (
          <PrivateRoute>
            <Subscribe />
          </PrivateRoute>
        )
      },

      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <StripeProvider>
              <Checkout />
            </StripeProvider>
          </PrivateRoute>
        )
      },

      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        )
      }
    ]
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path : "/subscription",
    element: <PrivateRoute><SubscriptionPage></SubscriptionPage></PrivateRoute>
  },
  {
    path: '/payment',
    element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>

  },



  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element:<DashboardHome/>
    },
      { path: "allusers", element: <AllUsers /> },
      { path: "allarticles", element: <AllArticles /> },
      { path: "addpublisher", element: <AddPublisher /> }
    ]
  }
]);
