import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alerts";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmationpassword: "",
  });
  const { email, name, password, confirmationpassword } = formData;

  const sumbitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmationpassword) {
      setAlert("Password do not match", "danger", 3000);
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1 className="text-cyan-400 text-3xl mb-4 font-bold">Register</h1>
        <h2 className=" mb-4 ">Create your account</h2>
        <form className="form" onSubmit={(e) => sumbitHandler(e)}>
          <div className="form-group mb-3">
            <input
              className="p-4 rounded-2xl border-2 border-cyan-400"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="p-4 rounded-2xl border-2 border-cyan-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="p-4 rounded-2xl border-2 border-cyan-400"
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
          <div className="form-group mb-3">
            <input
              className="p-4 rounded-2xl border-2 border-cyan-400"
              type="password"
              placeholder="Confirmation password"
              value={confirmationpassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmationpassword: e.target.value,
                })
              }
              minLength="6"
              autoComplete="on"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="btn cursor-pointer p-4 rounded-2xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
              type="submit"
              value="Register"
            />
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
