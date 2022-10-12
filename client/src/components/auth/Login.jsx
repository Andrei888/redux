import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmationpassword: "",
  });
  const { email, password } = formData;

  const sumbitHandler = async (e) => {
    e.prevendDefault();
    const credential = {
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(credential);

      const response = await axios.post("/api/auth", body, config);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <h1 className="">Login</h1>
        <form className="form" onSubmit={(e) => sumbitHandler(e)}>
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
            <input className="btn" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
