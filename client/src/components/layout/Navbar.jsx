import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.jpeg";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Navbar({ isAuthenticated }) {
  let loginBtn;
  if (!isAuthenticated) {
    loginBtn = (
      <NavLink
        className={(navData) => (navData.isActive ? "active" : "")}
        to="/login"
      >
        Login
      </NavLink>
    );
  } else {
    loginBtn = (
      <NavLink
        className={(navData) => (navData.isActive ? "active" : "")}
        to="/logout"
      >
        Logout
      </NavLink>
    );
  }
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
          <li className="p-2">{loginBtn}</li>
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

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Navbar);
