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
      console.log(data);
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
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen justify-center content-center items-center">
      <div className="justify-center content-center p-10 bg-white rounded-lg">
        <div className="posts-container">
          {posts.map((post) => {
            return (
              <div className="post-card p-4" key={post.id}>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.text}</p>
                <Link to="/filme/{post.id}">Detalii despre acest film</Link>
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
