import React from "react";
import { Link, Redirect } from "react-router-dom";
const Login = ({ login, isAuthenticated }) => {
  return isAuthenticated ? "Login" : <div>login</div>;
};

export default Login;
