import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.jpeg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Search from "./Search";

function Navbar({ isAuthenticated }) {
  let loggedinNav;
  if (!isAuthenticated) {
    loggedinNav = (
      <ul>
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
            to="/register"
          >
            Register
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/filme"
          >
            Filme
          </NavLink>
        </li>
      </ul>
    );
  } else {
    loggedinNav = (
      <ul>
        <li className="p-2">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/filme"
          >
            Filme
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/filmele-mele"
          >
            Filmele mele
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/logout"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <div className="header fixed w-full md:flex justify-between bg-cyan-400 p-3">
      <div className="w-20">
        <a href="/">
          <img src={logo} alt="React Logo" />
        </a>
      </div>
      <div className="navBar flex">
        {loggedinNav} <Search />
      </div>
    </div>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Navbar);
