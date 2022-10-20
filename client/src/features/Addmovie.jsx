import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pushmovie } from "../actions/pushmovie";

const Addmovie = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    file: "",
  });
  const { title, text, file } = formData;

  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    pushmovie({
      title,
      text,
      file,
    });
    setFormData({ title: "", text: "", file: "" });
  };
  return (
    <div className="p-8 rounded border-1 ">
      <form className="form" onSubmit={(e) => sumbitHandler(e)}>
        <div className="form-group p-3">
          <input
            className="p-4 rounded border-1 border-cyan-400"
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
            className="p-4 rounded border-1 border-cyan-400"
            type="text"
            placeholder="Descriere"
            value={text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            minLength="6"
            autoComplete="on"
            required
          />
        </div>
        <div className="form-group p-3">
          <label
            for="file-upload"
            className="p-4 rounded border-1 border-cyan-400 cyan-400"
          >
            Urca coperta
          </label>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            files={file}
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
          />
        </div>
        <div className="form-group">
          <input
            className="btn p-4 rounded border-1 border-cyan-400 cyan-400"
            type="submit"
            value="Adauga Film"
          />
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
  movies: state.movies,
});

export default connect(mapStateToProps, {})(Addmovie);
