import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";
import AddMovie from "../../features/Addmovie";

const MyPosts = ({ setAlert }) => {
  console.log("my posts");
  const [posts, setPosts] = useState([]);
  async function fetchData() {
    const token = store.getState().auth.token;
    try {
      const res = await axios.get("/api/myposts", {
        headers: {
          "x-auth-token": token ? token : "",
        },
      });
      const movies = res.data;
      setPosts(movies);
      setAlert("Filme Incarcate", "danger", 3000);
    } catch (error) {
      console.log(error);
      const errors = error.posts.data.errors;

      if (errors) {
        setAlert(errors.msg, "danger", 3000);
      }
    }
  }
  useEffect(() => {
    console.log("effect-myyy");
    fetchData();
  }, []);
  const showAddMovie = (e) => {
    e.preventDefault();
    e.target.classList.toggle("hidden");
    const showMovie = document.getElementById("addContainer");
    showMovie.classList.remove("hidden");
  };
  const showRemoveMovie = (e) => {
    e.preventDefault();
    e.target.classList.toggle("hidden");
    const showMovie = e.target.nextSibling;
    showMovie.classList.remove("hidden");
  };
  const removeMovie = async (e) => {
    e.preventDefault();

    const token = store.getState().auth.token;
    try {
      const url = "/api/posts/" + e.target.getAttribute("data-id");
      const res = await axios.delete(url, {
        headers: {
          "x-auth-token": token ? token : "",
        },
      });
      setAlert("Film sters", "danger", 3000);
    } catch (error) {
      console.log(error);
      const errors = error.posts.data.errors;

      if (errors) {
        setAlert(errors.msg, "danger", 3000);
      }
    }
  };
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <div className="posts-container">
          {posts.length === 0 && <div>Nu aveti filme adaugate personal.</div>}
          {posts.map((post) => {
            return (
              <div className="post-card p-4" key={post.id}>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.text}</p>
                <Link to={`/filme/${post.seo}`}>Detalii despre acest film</Link>
                <button onClick={(e) => showRemoveMovie(e)}>
                  Sterge Filmul
                </button>
                <div className="remove-movie-container hidden">
                  <p>Esti sigur ca vrei sa stergi acest film?</p>
                  <button data-id={post._id} onClick={(e) => removeMovie(e)}>
                    Da sterge
                  </button>
                </div>
              </div>
            );
          })}
          <div className="add-movie">
            <button onClick={(e) => showAddMovie(e)}>Adauga film</button>
            <div id="addContainer" className="add-movie-container hidden">
              <AddMovie />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyPosts.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(MyPosts);
