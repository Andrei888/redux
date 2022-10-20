import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alerts";
import { logout } from "../../actions/auth";

const Logout = ({ setAlert, logout, isAuthenticated }) => {
  const logoutHandler = (e) => {
    e.preventDefault();

    logout();
    setAlert("Logout completed", "danger", 3000);
  };
  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1>Are you sure you want to logout?</h1>
        <button
          className="btn p-4 rounded border-1 border-cyan-400 cyan-400"
          onClick={(e) => logoutHandler(e)}
        >
          Logout!!!
        </button>
      </div>
    </div>
  );
};

Logout.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, logout })(Logout);
