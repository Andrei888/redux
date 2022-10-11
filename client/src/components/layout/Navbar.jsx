import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.jpeg";

function Navbar() {
  return (
    <div className="header fixed w-full md:flex justify-between bg-cyan-400 p-3">
      <div className="w-20">
        <a href="/">
          <img src={logo} alt="React Logo" />
        </a>
      </div>
      <div className="navBar">
        <ul>
          <li className="p-2">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/posts"
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
