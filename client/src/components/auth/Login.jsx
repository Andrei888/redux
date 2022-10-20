import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const sumbitHandler = async (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };
  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1 className="">Login</h1>
        <form className="form" onSubmit={(e) => sumbitHandler(e)}>
          <div className="form-group">
            <input
              className="p-4 rounded border-1 border-cyan-400 cyan-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              className="p-4 rounded border-1 border-cyan-400 cyan-400"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              minLength="6"
              autoComplete="on"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="btn p-4 rounded border-1 border-cyan-400 cyan-400"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
