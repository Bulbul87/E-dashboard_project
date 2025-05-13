import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/image3.webp";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
    <div className="bg-violet-800 text-white font-semibold text-xl flex items-center fixed top-0 w-full p-4 shadow-md z-50">
      <img src={img} alt="logo" className="h-12 w-12 rounded-full mr-4" />
        {auth ? (
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-purple-600 active:text-green-500"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className="hover:text-purple-600 active:text-green-500"
              >
                Add Products
              </Link>
            </li>
            <li>
              <Link
                to="/update"
                className="hover:text-purple-600 active:text-green-500"
              >
                Update Products
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-purple-600 active:text-green-500"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logout}
                to="/signup"
                className="hover:text-purple-600 active:text-green-500"
              >
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-6 ml-auto">
            <li>
              <Link
                to="/signup"
                className="hover:text-purple-600 active:text-green-500"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-purple-600 active:text-green-500"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>

    
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
