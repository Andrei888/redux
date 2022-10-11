import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Register = (props) => {
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
      props.setAlert("Password do not match");
    } else {
      const user = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(user);

        const response = await axios.post("/api/users", body, config);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1 className="">Register</h1>
        <h2>Create your account</h2>
        <form className="form" onSubmit={(e) => sumbitHandler(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
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
          <div className="form-group">
            <input className="btn" type="submit" value="Register" />
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

export default connect(null, { setAlert })(Register);
