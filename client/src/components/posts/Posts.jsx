import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alerts";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Posts = ({ setAlert }) => {
  const [posts, setPosts] = useState([]);
  async function fetchData() {
    try {
      const res = await axios.get("/api/posts");
      const data = res.data;
      setPosts(data);
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
    console.log("effect-postss");
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <div className="posts-container">
          {posts.map((post) => {
            return (
              <div
                className="post-card rounded border-2 border-black p-4 mb-4 flex"
                key={post.id}
              >
                <div className="mr-4">
                  <div
                    className="post-card_cover w-6 h-6 "
                    style={{ backgroundImage: url(post.image.url) }}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Posts);
