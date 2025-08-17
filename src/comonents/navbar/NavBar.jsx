import React from "react";
import { NavLink } from "react-router-dom"; // Correct import for react-router-dom
import logo from "../../assets/logo.jpg";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOutUser } = UseAuth();

  const handleLogout = async () => {
    try {
      await logOutUser();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        text: error.message || "Something went wrong.",
      });
    }
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-article"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-articles"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          All Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myarticles"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          My Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/premium-articles"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          Premium Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user-photo"
          className={({ isActive }) =>
            `navlink ${isActive ? "font-bold underline" : ""}`
          }
        >
          User Profile
        </NavLink>
      </li>
    </>
  );

  return (
  <div className="navbar bg-blue-600 z-50 shadow-sm relative">

      <div className="navbar-start p-3">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-600 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-12 h-12 rounded-full" src={logo} alt="Logo" />
          <span className="text-2xl font-bold text-white">NewsFlash</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      <div className="navbar-end p-5 flex items-center gap-3">
        {user ? (
          <>
            <NavLink to="/user-photo" title="My Profile" className="tooltip tooltip-bottom" data-tip={user.displayName || "Profile"}>
              <img
                src={user.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-white hover:border-yellow-400 transition"
              />
            </NavLink>
            <button onClick={handleLogout} className="btn btn-error">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <button className="btn">Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
