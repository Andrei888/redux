import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.jpeg";

function Navbar() {
  return (
    <div class="header">
      <a href="/">
        <img src={logo} alt="React Logo" />
      </a>
      <div className="navBar">
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
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
