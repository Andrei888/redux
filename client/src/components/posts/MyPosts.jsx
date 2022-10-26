import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";
import AddMovie from "../../features/Addmovie";

const MyPosts = ({ setAlert }) => {
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
    } catch (error) {
      console.log(error);
      const errors = error.posts.data.errors;

      if (errors) {
        setAlert(errors.msg, "danger", 3000);
      }
    }
  }
  useEffect(() => {
    fetchData();
  });
  const showAddMovie = (e) => {
    e.preventDefault();
    e.target.classList.toggle("hidden");
    const showMovie = document.getElementById("addContainer");
    showMovie.classList.remove("hidden");
  };
  const changeMovie = (e, post) => {
    e.preventDefault();
    post.edit = true;
    console.log(post);
    posts.map((item) => {
      item.edit = true;
    });
    setPosts(posts);
  };

  const removeMovie = async (e) => {
    e.preventDefault();

    const token = store.getState().auth.token;
    try {
      const url = "/api/myposts/" + e.target.getAttribute("data-id");
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
          {posts.length === 0 && (
            <div>
              <p className="pb-4">Nu aveti filme adaugate personal.</p>
            </div>
          )}
          {posts.map((post) => {
            return (
              <div
                className="post-card rounded border-2 border-cyan-400 p-4 mb-4 flex"
                key={post.id}
              >
                <div class="post-card_info">
                  <div className="mr-4">
                    <div
                      className="post-card_cover w-24 h-24 "
                      style={{ backgroundImage: `url(${post.image.url})` }}
                    ></div>
                  </div>
                  <div>
                    <h2 className="post-card_title">{post.title}</h2>
                    <p className="post-card_body">{post.text}</p>
                    <p>
                      <Link to={`/filme/${post.seo}`}>
                        Detalii despre acest film
                      </Link>
                    </p>
                  </div>
                  <div class="post-card_edit">
                    {post.edit ? "No edi" : "edi"}
                  </div>
                  <button
                    data-id={post.seo}
                    onClick={(e) => changeMovie(e, post)}
                  >
                    Editeaza film
                  </button>
                  <button data-id={post.seo} onClick={(e) => removeMovie(e)}>
                    Sterge film
                  </button>
                </div>
              </div>
            );
          })}
          <div className="add-movie">
            <button
              className="block cursor-pointer p-4 rounded-2xl border-2 border-cyan-400 text-cyan-400"
              onClick={(e) => showAddMovie(e)}
            >
              Adauga film
            </button>
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
