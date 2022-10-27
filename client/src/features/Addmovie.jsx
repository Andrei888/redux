import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pushmovie } from "../actions/pushmovie";

const Addmovie = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    file: "",
    fileName: "Urca coperta",
  });
  const { title, text, file, fileName } = formData;

  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    pushmovie({
      title,
      text,
      file,
    });
    setFormData({ title: "", text: "", file: "", fileName: "Urca coperta" });
  };
  return (
    <div className="p-8 rounded-2xl border-2 ">
      <form className="form" onSubmit={(e) => sumbitHandler(e)}>
        <div className="form-group pb-3">
          <input
            className="p-4 rounded-2xl border-2 border-cyan-400"
            type="text"
            placeholder="Titlul filmului"
            value={title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group pb-3">
          <input
            className="p-4 rounded-2xl border-2 border-cyan-400"
            type="text"
            placeholder="Descriere"
            value={text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            minLength="6"
            autoComplete="on"
            required
          />
        </div>
        <div className="form-group pb-3">
          <label
            for="file-upload"
            className="block cursor-pointer p-4 rounded-2xl border-2 border-cyan-400 text-cyan-400"
          >
            {fileName}
          </label>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            files={file}
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setFormData({
                ...formData,
                file: e.target.files[0],
                fileName: e.target.files[0].name,
              })
            }
          />
        </div>
        <div className="form-group pb-3">
          <input
            className="btn cursor-pointer p-4 rounded-2xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
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
