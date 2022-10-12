import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function Logout({ isAuthenticated }) {
  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1>Are you sure you want to logout?</h1>
        <a href="#n">Logout!!!</a>
      </div>
    </div>
  );
}

Logout.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Logout);
