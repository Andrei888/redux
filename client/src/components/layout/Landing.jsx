import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function Landing({ isAuthenticated }) {
  return isAuthenticated ? (
    <Navigate to="/filme" />
  ) : (
    <div className="flex min-h-screen justify-center content-center items-center">
      <ul className="flex justify-center content-center p-10 bg-white rounded-lg">
        <li className="p-4">
          <Link
            className="rounded-full border-cyan-400 border-2 bg-cyan-400 p-4 m-2"
            to="/register"
          >
            Register
          </Link>
        </li>
        <li className="p-4">
          <Link
            className="rounded-full border-cyan-400 border-2 bg-cyan-400 p-4 m-2 hover:red"
            to="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);
