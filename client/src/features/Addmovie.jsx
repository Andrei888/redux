import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import pushmovie from "../actions/pushmovie";

const Addmovie = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const { title, text } = formData;

  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(title, text);
    pushmovie({
      title,
      text,
    });
  };
  return (
    <div className="">
      <form className="form" onSubmit={(e) => sumbitHandler(e)}>
        <div className="form-group p-3">
          <input
            type="text"
            placeholder="Titlul filmului"
            value={title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group p-3">
          <input
            type="text"
            placeholder="Descriere"
            value={text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            minLength="6"
            autoComplete="on"
            required
          />
        </div>
        <div className="form-group">
          <input className="btn" type="submit" value="Adauga Film" />
        </div>
      </form>
    </div>
  );
};

Addmovie.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Addmovie);